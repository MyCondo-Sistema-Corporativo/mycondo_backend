export class ResidentNotEligibleException extends Error {
  constructor() {
    super('The resident is not eligible to reserve a common area.');
    this.name = 'ResidentNotEligibleException';
  }
}
