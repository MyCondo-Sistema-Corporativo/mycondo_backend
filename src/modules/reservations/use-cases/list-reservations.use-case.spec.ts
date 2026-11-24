import { describe, it, expect, beforeEach } from 'vitest';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { InMemoryReservationsRepository } from '../repositories/in-memory-reservations.repository.js';
import { ListReservationsUseCase } from './list-reservations.use-case.js';

describe('ListReservationsUseCase', () => {
  let repository: InMemoryReservationsRepository;
  let useCase: ListReservationsUseCase;

  beforeEach(() => {
    repository = new InMemoryReservationsRepository();
    useCase = new ListReservationsUseCase(repository);
  });

  it('deve retornar um array vazio quando não houver reservas cadastradas (FA01 / CA03)', async () => {
    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('deve retornar todas as reservas ordenadas crescentemente por data de início (RN04 / CA01)', async () => {
    const res1 = new Reservation(
      'uuid-res-1',
      'resident-1',
      'area-1',
      new ReservationPeriod(
        new Date('2026-12-25T18:00:00.000Z'),
        new Date('2026-12-25T22:00:00.000Z'),
      ),
      ReservationStatus.PENDING,
    );

    const res2 = new Reservation(
      'uuid-res-2',
      'resident-2',
      'area-2',
      new ReservationPeriod(
        new Date('2026-12-10T14:00:00.000Z'),
        new Date('2026-12-10T18:00:00.000Z'),
      ),
      ReservationStatus.CONFIRMED,
    );

    // Salva fora de ordem propositalmente
    await repository.save(res1);
    await repository.save(res2);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    // Deve vir ordenado por startsAt ASC: res2 (dia 10) antes de res1 (dia 25)
    expect(result[0].reservationId).toBe('uuid-res-2');
    expect(result[1].reservationId).toBe('uuid-res-1');
  });
});
