import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

export class Reservation {
  private status: ReservationStatus;

  constructor(
    public readonly reservationId: string,
    public readonly residentId: string,
    public readonly commonAreaId: string,
    public readonly period: ReservationPeriod,
    status: ReservationStatus = ReservationStatus.PENDING,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    this.status = status;
  }

  get currentStatus(): ReservationStatus {
    return this.status;
  }

  confirm(): void {
    this.status = ReservationStatus.CONFIRMED;
    this.updatedAt = new Date();
  }

  cancel(): void {
    this.status = ReservationStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return (
      this.status === ReservationStatus.PENDING ||
      this.status === ReservationStatus.CONFIRMED
    );
  }
}
