import { Reservation } from '../entities/reservation.entity.js';
import { IReservationsRepository } from '../repositories/reservations.repository.interface.js';

export const LIST_RESERVATIONS_USE_CASE = 'LIST_RESERVATIONS_USE_CASE';

export class ListReservationsUseCase {
  constructor(
    private readonly reservationsRepository: IReservationsRepository,
  ) {}

  async execute(): Promise<Reservation[]> {
    return this.reservationsRepository.findAll();
  }
}
