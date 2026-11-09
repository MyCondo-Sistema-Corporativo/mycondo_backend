import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('Reservations API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let reservationId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  it('persists a reservation and reads it back', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-1',
        commonAreaId: 'party-room-e2e',
        startsAt: '2026-11-20T18:00:00.000Z',
        endsAt: '2026-11-20T22:00:00.000Z',
      })
      .expect(201);

    reservationId = response.body.reservationId;
    expect(response.body.status).toBe('pending');

    const persisted = await dataSource.query(
      'SELECT "reservationId" FROM "reservations" WHERE "reservationId" = $1',
      [reservationId],
    );
    expect(persisted).toHaveLength(1);

    await request(app.getHttpServer())
      .get(`/reservas/${reservationId}`)
      .expect(200)
      .expect((result) => {
        expect(result.body.reservationId).toBe(reservationId);
      });
  });

  it('rejects a conflicting period without adding a row', async () => {
    const before = await dataSource.query(
      'SELECT count(*)::int AS count FROM "reservations" WHERE "commonAreaId" = $1',
      ['party-room-e2e'],
    );

    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-1',
        commonAreaId: 'party-room-e2e',
        startsAt: '2026-11-20T20:00:00.000Z',
        endsAt: '2026-11-20T23:00:00.000Z',
      })
      .expect(409);

    const after = await dataSource.query(
      'SELECT count(*)::int AS count FROM "reservations" WHERE "commonAreaId" = $1',
      ['party-room-e2e'],
    );
    expect(after[0].count).toBe(before[0].count);
  });

  it('rejects an ineligible resident', async () => {
    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-ineligible',
        commonAreaId: 'another-area-e2e',
        startsAt: '2026-11-21T18:00:00.000Z',
        endsAt: '2026-11-21T22:00:00.000Z',
      })
      .expect(403);
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.query(
        'DELETE FROM "reservations" WHERE "reservationId" = $1',
        [reservationId],
      );
    }
    await app?.close();
  });
});
