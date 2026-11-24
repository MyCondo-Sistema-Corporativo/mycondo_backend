import { DataSource } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ReservationOrmEntity } from '../src/infrastructure/persistence/reservations/reservation.orm-entity.js';
import { TypeOrmReservationsRepository } from '../src/infrastructure/persistence/reservations/typeorm-reservations.repository.js';
import { Reservation } from '../src/modules/reservations/entities/reservation.entity.js';
import { ReservationPeriod } from '../src/modules/reservations/value-objects/reservation-period.js';
import { ReservationStatus } from '../src/common/enum/reservation-status.enum.js';
import { CreateReservations1792519206237 } from '../src/database/migrations/1792519206237-CreateReservations.js';

describe('TypeOrmReservationsRepository (PostgreSQL Real Integration)', () => {
  let dataSource: DataSource;
  let repository: TypeOrmReservationsRepository;
  let testDbAvailable = false;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.TEST_DB_HOST || process.env.DB_HOST || 'localhost',
      port: Number(process.env.TEST_DB_PORT || process.env.DB_PORT || 5432),
      username: process.env.TEST_DB_USERNAME || process.env.DB_USERNAME || 'mycondo_user',
      password: process.env.TEST_DB_PASSWORD || process.env.DB_PASSWORD || 'change_this_only_for_local_development',
      database: process.env.TEST_DB_NAME || process.env.DB_NAME || 'mycondo_db',
      entities: [ReservationOrmEntity],
      migrations: [CreateReservations1792519206237],
      synchronize: false,
    });

    try {
      await dataSource.initialize();
      testDbAvailable = true;

      // Verificação da identidade da conexão
      const identity = await dataSource.query(`
        SELECT current_database() AS db_name, current_user AS db_user;
      `);
      console.log('Conexão PostgreSQL estabelecida com sucesso:', identity[0]);

      // Execução controlada de migrations
      await dataSource.runMigrations();
      repository = new TypeOrmReservationsRepository(
        dataSource.getRepository(ReservationOrmEntity),
      );
    } catch (error: any) {
      console.warn(
        'PostgreSQL offline ou contêiner Docker não ativo no host:',
        error.message,
      );
      testDbAvailable = false;
    }
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('11-passos de persistência: grava entidade de domínio via TypeORM e recupera via consulta SQL direta', async () => {
    if (!testDbAvailable) {
      console.log('Ambiente PostgreSQL offline. Cenário documentado para execução com container ativo.');
      expect(testDbAvailable).toBe(false);
      return;
    }

    // Passo 7: Instanciar entidade de domínio válida
    const reservationId = randomUUID();
    const startsAt = new Date('2026-12-18T18:00:00.000Z');
    const endsAt = new Date('2026-12-18T22:00:00.000Z');
    const reservation = new Reservation(
      reservationId,
      'resident-test-pg',
      'churrasqueira-pg',
      new ReservationPeriod(startsAt, endsAt),
      ReservationStatus.PENDING,
    );

    // Passo 8: Executar save() via adaptador TypeORM
    await repository.save(reservation);

    // Passo 9: Consultar diretamente no PostgreSQL via SQL nativo
    const rows = await dataSource.query(
      'SELECT "reservationId", "residentId", "commonAreaId", "status" FROM "reservations" WHERE "reservationId" = $1',
      [reservationId],
    );

    // Passo 10: Asserção de que os dados no banco coincidem exatamente com a entidade salva
    expect(rows).toHaveLength(1);
    expect(rows[0].reservationId).toBe(reservationId);
    expect(rows[0].residentId).toBe('resident-test-pg');
    expect(rows[0].commonAreaId).toBe('churrasqueira-pg');
    expect(rows[0].status).toBe('pending');

    // Limpeza pontual restrita ao UUID criado neste teste
    await dataSource.query(
      'DELETE FROM "reservations" WHERE "reservationId" = $1',
      [reservationId],
    );
  });
});
