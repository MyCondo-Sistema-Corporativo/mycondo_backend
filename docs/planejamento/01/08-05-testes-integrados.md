# Artefato 08-05: Testes Integrados com Vitest e Supertest
**Caso de Uso:** UC01 — Reservar Área Comum  
**Arquivo de Teste:** `src/modules/reservations/http/reservations-integrated.spec.ts`  
**Data:** 17/11/2026  

---

## 1. Código Completo da Suíte Integrada

O teste exercita o pipeline completo sem mocks de serviço nem repositório:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
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
          useFactory: (repo, elig) => new ReserveCommonAreaUseCase(repo, elig),
          inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('Cenário 1 (Sucesso Integrado) — POST /reservas persiste no repositório em memória e retorna 201', async () => {
    const payload = {
      residentId: 'resident-101',
      commonAreaId: 'churrasqueira-01',
      startsAt: '2026-12-15T18:00:00.000Z',
      endsAt: '2026-12-15T22:00:00.000Z',
    };

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(payload)
      .expect(201);

    expect(response.body).toHaveProperty('reservationId');
    const createdId = response.body.reservationId;

    // Verificação direta no InMemoryReservationsRepository
    const stored = await inMemoryRepo.findById(createdId);
    expect(stored).not.toBeNull();
    expect(stored?.reservationId).toBe(createdId);
    expect(stored?.residentId).toBe('resident-101');
    expect(stored?.currentStatus).toBe(ReservationStatus.PENDING);
  });

  it('Cenário 2 (Consulta Integrada) — GET /reservas/:id recupera a reserva persistida pelo InMemoryRepo', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-202',
        commonAreaId: 'salao-festas-02',
        startsAt: '2026-12-20T14:00:00.000Z',
        endsAt: '2026-12-20T18:00:00.000Z',
      })
      .expect(201);

    const getRes = await request(app.getHttpServer())
      .get(`/reservas/${createRes.body.reservationId}`)
      .expect(200);

    expect(getRes.body.reservationId).toBe(createRes.body.reservationId);
  });

  it('Cenário 3 (Rejeição na Borda HTTP) — POST /reservas com dados inválidos retorna 400 Bad Request', async () => {
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
  });

  it('Cenário 4 (Conflito de Horário de Domínio) — POST /reservas em período sobreposto retorna 409 Conflict', async () => {
    await request(app.getHttpServer())
      .post('/reservas')
      .send({
        residentId: 'resident-301',
        commonAreaId: 'piscina-espaco-gourmet',
        startsAt: '2026-12-25T12:00:00.000Z',
        endsAt: '2026-12-25T16:00:00.000Z',
      })
      .expect(201);

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
    await expect(
      Test.createTestingModule({
        controllers: [ReservationsController],
      }).compile(),
    ).rejects.toThrow(/Nest can't resolve dependencies of the ReservationsController/);
  });
});
```

---

## 2. Evidência Real da Execução no Terminal

```text
$ vitest run
 RUN  v4.1.11 C:/Users/Vinicius/Desktop/SISTEMAS CORPORATIVOS/system/mycondo-backend/mycondo-backend/mycondo-backend

 ✓ src/modules/reservations/value-objects/reservation-period.spec.ts (2 tests) 13ms
 ✓ src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts (4 tests) 14ms
 ✓ src/modules/reservations/http/reservations.controller.spec.ts (2 tests) 13ms
 ✓ src/app.controller.spec.ts (1 test) 538ms
 ✓ src/modules/reservations/http/reservations-integrated.spec.ts (6 tests) 588ms

 Test Files  5 passed (5)
      Tests  15 passed (15)
   Start at  15:01:48
   Duration  3.08s
```
