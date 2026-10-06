import { ReservationConflictException } from '../../../common/exceptions/reservation-conflict.exception.js';
import { ResidentNotEligibleException } from '../../../common/exceptions/resident-not-eligible.exception.js';
import { Reservation } from '../entities/reservation.entity.js';
import { IReservationsRepository } from '../repositories/reservations.repository.interface.js';
import { IResidentEligibilityService } from '../services/resident-eligibility.service.interface.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

export interface ReserveCommonAreaRequest {
  reservationId: string;
  residentId: string;
  commonAreaId: string;
  startsAt: Date;
  endsAt: Date;
}

export class ReserveCommonAreaUseCase {
  constructor(
    private readonly reservationsRepository: IReservationsRepository,
    private readonly residentEligibilityService: IResidentEligibilityService,
  ) {}

  async execute(request: ReserveCommonAreaRequest): Promise<Reservation> {
    const eligible = await this.residentEligibilityService.isEligible(
      request.residentId,
    );

    if (!eligible) {
      throw new ResidentNotEligibleException();
    }

    const period = new ReservationPeriod(request.startsAt, request.endsAt);
    const conflict = await this.reservationsRepository.findActiveConflict(
      request.commonAreaId,
      period,
    );

    if (conflict) {
      throw new ReservationConflictException();
    }

    const reservation = new Reservation(
      request.reservationId,
      request.residentId,
      request.commonAreaId,
      period,
    );

    await this.reservationsRepository.save(reservation);
    return reservation;
  }
}

export const RESERVE_COMMON_AREA_USE_CASE = 'RESERVE_COMMON_AREA_USE_CASE';
