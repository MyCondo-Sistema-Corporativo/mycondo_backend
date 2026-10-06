import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

export const RESERVATIONS_REPOSITORY = 'RESERVATIONS_REPOSITORY';

export interface IReservationsRepository {
  findActiveConflict(
    commonAreaId: string,
    period: ReservationPeriod,
  ): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<void>;
}
