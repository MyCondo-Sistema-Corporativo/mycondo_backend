import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RESERVE_COMMON_AREA_USE_CASE, ReserveCommonAreaUseCase } from './use-cases/reserve-common-area.use-case.js';
import { IReservationsRepository, RESERVATIONS_REPOSITORY } from './repositories/reservations.repository.interface.js';
import { IResidentEligibilityService, RESIDENT_ELIGIBILITY_SERVICE } from './services/resident-eligibility.service.interface.js';
import { ReservationsController } from './http/reservations.controller.js';
import { ReservationOrmEntity } from '../../infrastructure/persistence/reservations/reservation.orm-entity.js';
import { TypeOrmReservationsRepository } from '../../infrastructure/persistence/reservations/typeorm-reservations.repository.js';
import { ConfiguredResidentEligibilityService } from '../../infrastructure/persistence/reservations/resident-eligibility.service.js';

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
      useFactory: (
        repository: IReservationsRepository,
        eligibilityService: IResidentEligibilityService,
      ) => new ReserveCommonAreaUseCase(repository, eligibilityService),
      inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
    },
  ],
  exports: [RESERVATIONS_REPOSITORY],
})
export class ReservationsModule {}
