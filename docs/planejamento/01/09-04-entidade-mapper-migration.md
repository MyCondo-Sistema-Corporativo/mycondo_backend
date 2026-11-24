# Artefato 09-04: Entidade ORM, Mapper e Migration
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Código da Entidade ORM (`src/infrastructure/persistence/reservations/reservation.orm-entity.ts`)

A entidade ORM é isolada na camada de infraestrutura e reflete a estrutura física do banco:

```typescript
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  reservationId!: string;

  @Column({ type: 'varchar', length: 100 })
  residentId!: string;

  @Column({ type: 'varchar', length: 100 })
  commonAreaId!: string;

  @Column({ type: 'timestamptz' })
  startsAt!: Date;

  @Column({ type: 'timestamptz' })
  endsAt!: Date;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled'] })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @Column({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ type: 'timestamptz' })
  updatedAt!: Date;
}
```

*Decisões de persistência:* `length: 100` em IDs e tipo `timestamptz` para suporte a fuso horário UTC padronizado.

---

## 2. Código da Migration (`src/database/migrations/1792519206237-CreateReservations.ts`)

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservations1792519206237 implements MigrationInterface {
  name = 'CreateReservations1792519206237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "reservation_status_enum" AS ENUM ('pending', 'confirmed', 'cancelled')
    `);
    await queryRunner.query(`
      CREATE TABLE "reservations" (
        "reservationId" uuid NOT NULL,
        "residentId" varchar(100) NOT NULL,
        "commonAreaId" varchar(100) NOT NULL,
        "startsAt" TIMESTAMPTZ NOT NULL,
        "endsAt" TIMESTAMPTZ NOT NULL,
        "status" "reservation_status_enum" NOT NULL DEFAULT 'pending',
        "createdAt" TIMESTAMPTZ NOT NULL,
        "updatedAt" TIMESTAMPTZ NOT NULL,
        CONSTRAINT "PK_reservations_reservationId" PRIMARY KEY ("reservationId"),
        CONSTRAINT "CHK_reservations_period" CHECK ("startsAt" < "endsAt")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_reservations_area_period"
      ON "reservations" ("commonAreaId", "startsAt", "endsAt")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_reservations_area_period"');
    await queryRunner.query('DROP TABLE "reservations"');
    await queryRunner.query('DROP TYPE "reservation_status_enum"');
  }
}
```

---

## 3. Código do Mapper (`src/infrastructure/persistence/reservations/reservation.mapper.ts`)

O `ReservationMapper` converte bidirecionalmente entre o modelo de domínio puro e o modelo relacional sem vazar detalhes de persistência:

```typescript
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { Reservation } from '../../../modules/reservations/entities/reservation.entity.js';
import { ReservationPeriod } from '../../../modules/reservations/value-objects/reservation-period.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';

export class ReservationMapper {
  static toDomain(entity: ReservationOrmEntity): Reservation {
    return new Reservation(
      entity.reservationId,
      entity.residentId,
      entity.commonAreaId,
      new ReservationPeriod(entity.startsAt, entity.endsAt),
      entity.status as ReservationStatus,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(reservation: Reservation): ReservationOrmEntity {
    const entity = new ReservationOrmEntity();
    entity.reservationId = reservation.reservationId;
    entity.residentId = reservation.residentId;
    entity.commonAreaId = reservation.commonAreaId;
    entity.startsAt = reservation.period.startsAt;
    entity.endsAt = reservation.period.endsAt;
    entity.status = reservation.currentStatus;
    entity.createdAt = reservation.createdAt;
    entity.updatedAt = reservation.updatedAt;
    return entity;
  }
}
```
