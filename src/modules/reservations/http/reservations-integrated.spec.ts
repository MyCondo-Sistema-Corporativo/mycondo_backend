import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { ReservationsController } from './reservations.controller.js';
import {
  RESERVE_COMMON_AREA_USE_CASE,
  ReserveCommonAreaUseCase,
} from '../use-cases/reserve-common-area.use-case.js';
import {
  RESERVATIONS_REPOSITORY,
  IReservationsRepository,
} from '../repositories/reservations.repository.interface.js';
import { InMemoryReservationsRepository } from '../repositories/in-memory-reservations.repository.js';
import {
  RESIDENT_ELIGIBILITY_SERVICE,
  IResidentEligibilityService,
} from '../services/resident-eligibility.service.interface.js';
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';

describe('Reservations Integrated Backend (HTTP -> Controller -> UseCase -> InMemoryRepo)', () => {
  let app: INestApplication;
  let inMemoryRepo: InMemoryReservationsRepository;
  let eligibilityService: IResidentEligibilityService;

  beforeAll(async () => {
    inMemoryRepo = new InMemoryReservationsRepository();
    eligibilityService = {
      isEligible: async (residentId: string) => residentId !== 'resident-inadimplente',
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: RESERVATIONS_REPOSITORY,
          useValue: inMemoryRepo,
        },
        {
          provide: RESIDENT_ELIGIBILITY_SERVICE,
          useValue: eligibilityService,
        },
        {
          provide: RESERVE_COMMON_AREA_USE_CASE,
          useFactory: (
            repo: IReservationsRepository,
            elig: IResidentEligibilityService,
          ) => new ReserveCommonAreaUseCase(repo, elig),
          inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('Cenário 1 (Sucesso Integrado) — POST /reservas persiste no repositório em memória e retorna 201', async () => {
    // Arrange: payload válido com data futura (UC01)
    const payload = {
      residentId: 'resident-101',
      commonAreaId: 'churrasqueira-01',
      startsAt: '2026-12-15T18:00:00.000Z',
      endsAt: '2026-12-15T22:00:00.000Z',
    };

    // Act: Requisição HTTP real processada pelo NestJS e pelo caso de uso real
    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(payload)
      .expect(201);

    // Assert na resposta HTTP
    expect(response.body).toHaveProperty('reservationId');
    expect(response.body.residentId).toBe('resident-101');
    expect(response.body.commonAreaId).toBe('churrasqueira-01');
    expect(response.body.status).toBe(ReservationStatus.PENDING);
    expect(response.body.startsAt).toBe('2026-12-15T18:00:00.000Z');
    expect(response.body.endsAt).toBe('2026-12-15T22:00:00.000Z');

    const createdId = response.body.reservationId;

    // Assert direto no Repositório em Memória (comprova integração sem mock)
    const stored = await inMemoryRepo.findById(createdId);
    expect(stored).not.toBeNull();
    expect(stored?.reservationId).toBe(createdId);
    expect(stored?.residentId).toBe('resident-101');
    expect(stored?.commonAreaId).toBe('churrasqueira-01');
    expect(stored?.currentStatus).toBe(ReservationStatus.PENDING);
  });

  it('Cenário 2 (Consulta Integrada) — GET /reservas/:id recupera a reserva persistida pelo InMemoryRepo', async () => {
    // Criação via POST
    const createRes = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-202',
        commonAreaId: 'salao-festas-02',
        startsAt: '2026-12-20T14:00:00.000Z',
        endsAt: '2026-12-20T18:00:00.000Z',
      })
      .expect(201);

    const reservationId = createRes.body.reservationId;

    // Act: Consulta via GET
    const getRes = await request(app.getHttpServer())
      .get(`/reservas/${reservationId}`)
      .expect(200);

    // Assert
    expect(getRes.body.reservationId).toBe(reservationId);
    expect(getRes.body.residentId).toBe('resident-202');
    expect(getRes.body.commonAreaId).toBe('salao-festas-02');
  });

  it('Cenário 3 (Rejeição na Borda HTTP) — POST /reservas com dados inválidos retorna 400 Bad Request', async () => {
    // Act: ResidentId vazio e formato de data inválido
    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: '   ',
        commonAreaId: 'salao-festas-01',
        startsAt: 'data-invalida',
        endsAt: '2026-12-10T22:00:00.000Z',
      })
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toContain('startsAt must be an ISO-8601 date.');
  });

  it('Cenário 4 (Conflito de Horário de Domínio) — POST /reservas em período sobreposto retorna 409 Conflict', async () => {
    // Primeira reserva no período
    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-301',
        commonAreaId: 'piscina-espaco-gourmet',
        startsAt: '2026-12-25T12:00:00.000Z',
        endsAt: '2026-12-25T16:00:00.000Z',
      })
      .expect(201);

    // Segunda reserva conflitante no mesmo espaço
    const conflictRes = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-302',
        commonAreaId: 'piscina-espaco-gourmet',
        startsAt: '2026-12-25T14:00:00.000Z',
        endsAt: '2026-12-25T18:00:00.000Z',
      })
      .expect(409);

    expect(conflictRes.body.statusCode).toBe(409);
    expect(conflictRes.body.error).toBe('ReservationConflictException');
  });

  it('Cenário 5 (Inadimplência de Morador) — POST /reservas para morador inelegível retorna 403 Forbidden', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-inadimplente',
        commonAreaId: 'quadra-tenis-01',
        startsAt: '2026-12-30T10:00:00.000Z',
        endsAt: '2026-12-30T12:00:00.000Z',
      })
      .expect(403);

    expect(response.body.statusCode).toBe(403);
    expect(response.body.error).toBe('ResidentNotEligibleException');
  });

  it('Cenário 6 (Diagnóstico de Falha de DI) — contexto de teste sem providers lança UnknownDependenciesException', async () => {
    // Tentativa de compilar o módulo de teste isolado registrando o Controller sem fornecer seus providers
    await expect(
      Test.createTestingModule({
        controllers: [ReservationsController],
      }).compile(),
    ).rejects.toThrow(/Nest can't resolve dependencies of the ReservationsController/);
  });
});
