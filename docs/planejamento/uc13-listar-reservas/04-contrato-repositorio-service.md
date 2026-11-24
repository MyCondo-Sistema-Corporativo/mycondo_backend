# 04 — Ampliação do Contrato do Repositório e Caso de Uso no Service
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  

---

## 1. Unidade 1: Ampliação do Contrato `IReservationsRepository`

A ampliação foi realizada de forma puramente aditiva no arquivo `src/modules/reservations/repositories/reservations.repository.interface.ts`, preservando integralmente as assinaturas pré-existentes:

```typescript
export interface IReservationsRepository {
  findActiveConflict(
    commonAreaId: string,
    period: ReservationPeriod,
  ): Promise<Reservation | null>;
  findById(reservationId: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>; // Operação aditiva do UC13
  save(reservation: Reservation): Promise<void>;
}
```

---

## 2. Unidade 2: Caso de Uso na Camada de Aplicação (`ListReservationsUseCase`)

Implementado em `src/modules/reservations/use-cases/list-reservations.use-case.ts`:
- Totalmente desacoplado de HTTP, TypeORM ou frameworks externos;
- Depende exclusivamente da interface abstrata `IReservationsRepository`;
- Token de injeção associado: `LIST_RESERVATIONS_USE_CASE`.

```typescript
export class ListReservationsUseCase {
  constructor(
    private readonly reservationsRepository: IReservationsRepository,
  ) {}

  async execute(): Promise<Reservation[]> {
    return this.reservationsRepository.findAll();
  }
}
```

---

## 3. Unidade 3: Implementação em Memória (`InMemoryReservationsRepository`)

Atualizado em `src/modules/reservations/repositories/in-memory-reservations.repository.ts`:
- Retorna uma cópia ordenada do array em memória (`[...this.reservations]`);
- Aplica ordenação cronológica crescente pelo início do período (`startsAt ASC`), atendendo à RN04.

```typescript
  async findAll(): Promise<Reservation[]> {
    return [...this.reservations].sort(
      (a, b) => a.period.startsAt.getTime() - b.period.startsAt.getTime(),
    );
  }
```

---

## 4. Unidade 4: Implementação com TypeORM (`TypeOrmReservationsRepository`)

Atualizado em `src/infrastructure/persistence/reservations/typeorm-reservations.repository.ts`:
- Consulta a tabela relacional via `this.repository.find({ order: { startsAt: 'ASC' } })`;
- Converte cada entidade ORM física para a entidade pura de domínio usando `ReservationMapper.toDomain(entity)`.

```typescript
  async findAll(): Promise<Reservation[]> {
    const entities = await this.repository.find({
      order: {
        startsAt: 'ASC',
      },
    });
    return entities.map((entity) => ReservationMapper.toDomain(entity));
  }
```
