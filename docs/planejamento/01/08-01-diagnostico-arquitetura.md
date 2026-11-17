# Artefato 08-01: Diagnóstico da Arquitetura e do Papel da Integração sem Mocks
**Caso de Uso:** UC01 — Reservar Área Comum  
**Módulo:** `ReservationsModule`  
**Data:** 17/11/2026  
**Status:** Implementado e Verificado em Memória (Sem Mocks na Aplicação e Repositório)

---

## 1. Mapeamento Estrutural das Camadas Arquiteturais

A arquitetura do backend MyCondo segue rigorosamente os princípios da Clean Architecture e Domain-Driven Design (DDD), garantindo o desacoplamento entre a borda HTTP, a regra de negócio e os mecanismos de persistência:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Camada de Apresentação / Borda HTTP                                │
│    - ReservationsController (Decorators @Controller, @Post, @Get)     │
│    - ReserveCommonAreaDto (Validação estrutural dos campos recebidos)   │
│    - ReservationExceptionFilter (Tradução de Domain Exceptions -> HTTP)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Chama interface do Caso de Uso
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. Camada de Aplicação (Application Service)                          │
│    - ReserveCommonAreaUseCase (Token RESERVE_COMMON_AREA_USE_CASE)     │
│    - Orquestração: Inadimplência -> Período -> Conflito -> Persistência│
│    - Totalmente desacoplada de HTTP, Express ou TypeORM                │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │ Usa entidades                   │ Invoca contrato
                   ▼                                 ▼
┌─────────────────────────────────────┐ ┌────────────────────────────────┐
│ 3. Camada de Domínio                │ │ 4. Camada de Persistência      │
│    - Entity Reservation             │ │    - IReservationsRepository   │
│    - Value Object ReservationPeriod │ │    - InMemoryReservationsRepo  │
│    - Enum ReservationStatus         │ │    - (Futuro TypeOrmRepo)      │
│    - Regras invariantes puras       │ │                                │
└─────────────────────────────────────┘ └────────────────────────────────┘
```

---

## 2. Papel da Integração sem Mocks na Camada de Dados

### 2.1 A Limitação dos Mocks em Testes de Fronteira
Nos testes unitários de Controller (`reservations.controller.spec.ts`), o caso de uso e o repositório foram substituídos por mocks sintéticos (`vi.fn()`). Embora essa abordagem seja excelente para validar parsing de DTO e geração de status codes, ela possui pontos cegos críticos:
- Não valida se o DTO realmente atende aos tipos exigidos pelo caso de uso;
- Não valida o ciclo de vida real da entidade ao ser instanciada e manipulada;
- Assume artificialmente que o repositório sempre responde adequadamente, mascarando bugs de contrato.

### 2.2 O Valor do InMemoryReservationsRepository no Teste Integrado
Ao substituir mocks por uma implementação em memória concreta (`InMemoryReservationsRepository`), o teste integrado atinge um nível superior de fidelidade:
1. **Comportamento Real de Armazenamento:** A entidade criada pelo caso de uso é realmente inserida na coleção interna (`this.reservations.push(reservation)`).
2. **Validação de Leitura Imediata:** É possível inspecionar o estado do repositório em memória logo após o request HTTP (`await inMemoryRepo.findById(id)`), garantindo que a persistência de fato ocorreu.
3. **Detecção de Conflitos Genuínos:** O método `findActiveConflict` executa a lógica real de sobreposição de períodos em memória, permitindo testar requisições concorrentes ou consecutivas sem forjar retornos.
4. **Independência de Infraestrutura:** Não há necessidade de instanciar contêineres Docker de banco PostgreSQL ou rodar migrações DDL para garantir que a orquestração do backend está íntegra.
