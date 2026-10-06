import { InvalidReservationPeriodException } from '../../../common/exceptions/invalid-reservation-period.exception.js';
import { ReservationPeriod } from './reservation-period.js';

describe('ReservationPeriod', () => {
  it('rejects a period whose start is after its end', () => {
    expect(
      () =>
        new ReservationPeriod(
          new Date('2026-10-10T22:00:00.000Z'),
          new Date('2026-10-10T18:00:00.000Z'),
        ),
    ).toThrow(InvalidReservationPeriodException);
  });

  it('allows adjacent periods without overlap', () => {
    const first = new ReservationPeriod(
      new Date('2026-10-10T18:00:00.000Z'),
      new Date('2026-10-10T20:00:00.000Z'),
    );
    const second = new ReservationPeriod(
      new Date('2026-10-10T20:00:00.000Z'),
      new Date('2026-10-10T22:00:00.000Z'),
    );

    expect(first.overlaps(second)).toBe(false);
  });
});
