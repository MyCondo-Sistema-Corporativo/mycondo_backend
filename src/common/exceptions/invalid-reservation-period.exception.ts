export class InvalidReservationPeriodException extends Error {
  constructor() {
    super('Reservation period must start before it ends.');
    this.name = 'InvalidReservationPeriodException';
  }
}
