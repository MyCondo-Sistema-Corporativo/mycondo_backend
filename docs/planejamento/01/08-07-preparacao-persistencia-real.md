# Artefato 08-07: Análise das Limitações da Persistência In-Memory e Preparação Conceitual para Banco Real
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  
**Tecnologia Alvo Futura:** PostgreSQL + TypeORM  

---

## 1. Análise Minuciosa das 6 Limitações Críticas da Persistência In-Memory

Embora o repositório em memória seja ideal para testes de integração rápidos e determinísticos, ele é inviável para produção devido a 6 fatores arquiteturais:

### 1.1 Volatilidade e Perda Irrecuperável de Estado
- **Problema:** Todos os dados residem em um array JavaScript em heap RAM (`this.reservations: Reservation[] = []`).
- **Impacto em Produção:** Qualquer reinicialização de processo, deploy de nova versão, reinício de contêiner ou crash fatal limpa instantaneamente todas as reservas do condomínio.

### 1.2 Concorrência e Ausência de Transações ACID
- **Problema:** O Node.js possui um event loop single-threaded, mas operações assíncronas com `await` intercalam execuções.
- **Impacto em Produção:** Se dois moradores submeterem reservas para o Salão de Festas na mesma data e milissegundo, ambos podem passar na verificação `findActiveConflict` antes que o primeiro chame `save`, causando **dupla reserva (overbooking)**. A memória RAM nativa não fornece locks transacionais (`SELECT ... FOR UPDATE` ou isolamento `SERIALIZABLE`).

### 1.3 Desempenho e Falta de Suporte a Índices de Consulta
- **Problema:** A busca de conflitos no `InMemoryReservationsRepository` faz um scan linear $O(N)$ em memória usando `Array.prototype.find()`.
- **Impacto em Produção:** Com milhares de reservas no histórico, cada tentativa de agendamento percorreria sequencialmente todo o array, degradando a CPU e aumentando o tempo de resposta da API. O PostgreSQL resolve isso com índices B-Tree e índices espaciais/temporais GiST.

### 1.4 Ausência de Integridade Referencial Estrutural
- **Problema:** O repositório em memória aceita qualquer string para `residentId` ou `commonAreaId`.
- **Impacto em Produção:** Não há integridade referencial (Foreign Keys) para assegurar que a área comum realmente existe no condomínio ou que o morador pertence à base cadastral válida.

### 1.5 Limitação de Volume e Esgotamento de Memória (Heap Exhaustion)
- **Problema:** O garbage collector do V8 precisa gerenciar o crescimento indefinido do array de reservas na memória do processo.
- **Impacto em Produção:** À medida que o condomínio acumula anos de reservas, o processo atinge o limite do heap do Node.js (geralmente 1.4 GB a 2 GB), resultando em erro `Fatal process out of memory: Heap limit Allocation failed`.

### 1.6 Incompatibilidade com Escalabilidade Horizontal (Clustering / Multi-instance)
- **Problema:** A memória do processo não é compartilhada entre contêineres ou pods Kubernetes.
- **Impacto em Produção:** Em um cluster com 3 réplicas do backend atrás de um Load Balancer, a réplica A não enxerga as reservas criadas na réplica B, quebrando totalmente a consistência do sistema.

---

## 2. Preparação Conceitual para Banco Real (PostgreSQL + TypeORM)

> [!IMPORTANT]
> Esta seção estabelece o planejamento conceitual e o design da camada de dados para a próxima fase. Nenhuma migração ou conexão com banco de dados real é executada neste momento.

### 2.1 Modelo Relacional e Esquema DDL Conceitual
```sql
CREATE TABLE reservations (
    reservation_id UUID PRIMARY KEY,
    resident_id VARCHAR(100) NOT NULL,
    common_area_id VARCHAR(100) NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    version INT NOT NULL DEFAULT 1,
    CONSTRAINT chk_reservation_period CHECK (ends_at > starts_at)
);

-- Índice para busca otimizada de conflitos de agenda
CREATE INDEX idx_reservations_area_period 
ON reservations (common_area_id, starts_at, ends_at)
WHERE status != 'cancelled';
```

### 2.2 Estrutura da Entidade de Persistência (TypeORM)
```typescript
@Entity('reservations')
export class ReservationOrmEntity {
  @PrimaryColumn('uuid')
  reservationId: string;

  @Column({ name: 'resident_id' })
  residentId: string;

  @Column({ name: 'common_area_id' })
  commonAreaId: string;

  @Column('timestamptz', { name: 'starts_at' })
  startsAt: Date;

  @Column('timestamptz', { name: 'ends_at' })
  endsAt: Date;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
```

### 2.3 Estratégia de Isolamento Transacional e Concorrência
Para evitar overbooking concorrente em ambientes de alta concorrência:
1. **Lock Otimista:** Utilização do decorator `@VersionColumn()` do TypeORM para abortar gravações concorrentes conflitantes.
2. **Lock Pessimista:** No método `findActiveConflict`, utilizar consulta transacional com `queryRunner.manager.createQueryBuilder().setLock('pessimistic_write')`.
