import { Reservation } from '../entities/reservation.entity.js';
import { IReservationsRepository } from './reservations.repository.interface.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

export class InMemoryReservationsRepository implements IReservationsRepository {
  private readonly reservations: Reservation[] = [];

  async findActiveConflict(
    commonAreaId: string,
    period: ReservationPeriod,
  ): Promise<Reservation | null> {
    return (
      this.reservations.find(
        (reservation) =>
          reservation.commonAreaId === commonAreaId &&
          reservation.isActive() &&
          reservation.period.overlaps(period),
      ) ?? null
    );
  }

  async save(reservation: Reservation): Promise<void> {
    this.reservations.push(reservation);
  }
}
