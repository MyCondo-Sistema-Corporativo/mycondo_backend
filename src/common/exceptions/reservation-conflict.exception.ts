export class ReservationConflictException extends Error {
  constructor() {
    super('The common area is already reserved for the requested period.');
    this.name = 'ReservationConflictException';
  }
}
