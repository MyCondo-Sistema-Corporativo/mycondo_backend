# Artefato 09-05: Repositório TypeORM e Configuração de Providers
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Implementação do Adaptador Concreto TypeORM

O `TypeOrmReservationsRepository` implementa o contrato `IReservationsRepository` utilizando a API do TypeORM com tipagem forte e mapeamento explícito:

```typescript
import { Repository } from 'typeorm';
import { Reservation } from '../../../modules/reservations/entities/reservation.entity.js';
import { IReservationsRepository } from '../../../modules/reservations/repositories/reservations.repository.interface.js';
import { ReservationPeriod } from '../../../modules/reservations/value-objects/reservation-period.js';
import { ReservationMapper } from './reservation.mapper.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';

export class TypeOrmReservationsRepository implements IReservationsRepository {
  constructor(private readonly repository: Repository<ReservationOrmEntity>) {}

  async findActiveConflict(
    commonAreaId: string,
    period: ReservationPeriod,
  ): Promise<Reservation | null> {
    const entity = await this.repository
      .createQueryBuilder('reservation')
      .where('reservation.commonAreaId = :commonAreaId', { commonAreaId })
      .andWhere('reservation.status IN (:...statuses)', {
        statuses: ['pending', 'confirmed'],
      })
      .andWhere('reservation.startsAt < :endsAt', { endsAt: period.endsAt })
      .andWhere('reservation.endsAt > :startsAt', { startsAt: period.startsAt })
      .getOne();

    return entity ? ReservationMapper.toDomain(entity) : null;
  }

  async findById(reservationId: string): Promise<Reservation | null> {
    const entity = await this.repository.findOneBy({ reservationId });
    return entity ? ReservationMapper.toDomain(entity) : null;
  }

  async save(reservation: Reservation): Promise<void> {
    await this.repository.save(ReservationMapper.toPersistence(reservation));
  }
}
```

---

## 2. Registro no Módulo (`src/modules/reservations/reservations.module.ts`)

O módulo associa o token de injeção `RESERVATIONS_REPOSITORY` à fábrica do adaptador TypeORM:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([ReservationOrmEntity])],
  controllers: [ReservationsController],
  providers: [
    {
      provide: RESERVATIONS_REPOSITORY,
      useFactory: (repository: Repository<ReservationOrmEntity>) =>
        new TypeOrmReservationsRepository(repository),
      inject: [getRepositoryToken(ReservationOrmEntity)],
    },
    {
      provide: RESIDENT_ELIGIBILITY_SERVICE,
      useClass: ConfiguredResidentEligibilityService,
    },
    {
      provide: RESERVE_COMMON_AREA_USE_CASE,
      useFactory: (repository, eligibilityService) =>
        new ReserveCommonAreaUseCase(repository, eligibilityService),
      inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
    },
  ],
  exports: [RESERVATIONS_REPOSITORY],
})
export class ReservationsModule {}
```

---

## 3. Preservação dos Testes em Memória (Material 08)

O teste de integração em memória (`reservations-integrated.spec.ts`) substitui explicitamente o provider no `Test.createTestingModule` fornecendo o `InMemoryReservationsRepository`. Dessa forma:
* Os testes em memória rodam em milissegundos sem depender de banco ou contêiner;
* O comportamento de produção utiliza a injeção do `TypeOrmReservationsRepository` conectado ao PostgreSQL.
