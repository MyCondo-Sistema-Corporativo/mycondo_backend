import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { ReservationConflictException } from '../../../common/exceptions/reservation-conflict.exception.js';
import { ResidentNotEligibleException } from '../../../common/exceptions/resident-not-eligible.exception.js';
import { InMemoryReservationsRepository } from '../repositories/in-memory-reservations.repository.js';
import { ReserveCommonAreaUseCase } from './reserve-common-area.use-case.js';

describe('ReserveCommonAreaUseCase', () => {
  it('creates a pending reservation for an eligible resident', async () => {
    const repository = new InMemoryReservationsRepository();
    const useCase = new ReserveCommonAreaUseCase(repository, {
      isEligible: async () => true,
    });

    const reservation = await useCase.execute({
      reservationId: 'reservation-1',
      residentId: 'resident-1',
      commonAreaId: 'party-room-1',
      startsAt: new Date('2026-10-10T18:00:00.000Z'),
      endsAt: new Date('2026-10-10T22:00:00.000Z'),
    });

    expect(reservation.currentStatus).toBe(ReservationStatus.PENDING);
    expect(reservation.commonAreaId).toBe('party-room-1');
  });

  it('rejects a reservation for an ineligible resident', async () => {
    const useCase = new ReserveCommonAreaUseCase(
      new InMemoryReservationsRepository(),
      { isEligible: async () => false },
    );

    await expect(
      useCase.execute({
        reservationId: 'reservation-1',
        residentId: 'resident-1',
        commonAreaId: 'party-room-1',
        startsAt: new Date('2026-10-10T18:00:00.000Z'),
        endsAt: new Date('2026-10-10T22:00:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(ResidentNotEligibleException);
  });

  it('rejects overlapping reservations for the same area', async () => {
    const repository = new InMemoryReservationsRepository();
    const useCase = new ReserveCommonAreaUseCase(repository, {
      isEligible: async () => true,
    });

    await useCase.execute({
      reservationId: 'reservation-1',
      residentId: 'resident-1',
      commonAreaId: 'party-room-1',
      startsAt: new Date('2026-10-10T18:00:00.000Z'),
      endsAt: new Date('2026-10-10T22:00:00.000Z'),
    });

    await expect(
      useCase.execute({
        reservationId: 'reservation-2',
        residentId: 'resident-2',
        commonAreaId: 'party-room-1',
        startsAt: new Date('2026-10-10T20:00:00.000Z'),
        endsAt: new Date('2026-10-10T23:00:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(ReservationConflictException);
  });
});
