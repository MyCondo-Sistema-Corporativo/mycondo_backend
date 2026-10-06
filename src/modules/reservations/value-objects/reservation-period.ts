import { InvalidReservationPeriodException } from '../../../common/exceptions/invalid-reservation-period.exception.js';

export class ReservationPeriod {
  constructor(
    public readonly startsAt: Date,
    public readonly endsAt: Date,
  ) {
    if (
      Number.isNaN(startsAt.getTime()) ||
      Number.isNaN(endsAt.getTime()) ||
      startsAt >= endsAt
    ) {
      throw new InvalidReservationPeriodException();
    }
  }

  overlaps(other: ReservationPeriod): boolean {
    return this.startsAt < other.endsAt && other.startsAt < this.endsAt;
  }
}
