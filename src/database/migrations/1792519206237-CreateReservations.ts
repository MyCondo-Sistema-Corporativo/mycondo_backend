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
