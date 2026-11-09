import { Repository } from 'typeorm';
import { Reservation } from '../../../modules/reservations/entities/reservation.entity.js';
import { IReservationsRepository } from '../../../modules/reservations/repositories/reservations.repository.interface.js';
import { ReservationPeriod } from '../../../modules/reservations/value-objects/reservation-period.js';
import { ReservationMapper } from './reservation.mapper.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';

export class TypeOrmReservationsRepository implements IReservationsRepository {
  constructor(private readonly repository: Repository<ReservationOrmEntity>) {}

  async findActiveConflict(
    commonAreaId: string,
    period: ReservationPeriod,
  ): Promise<Reservation | null> {
    const entity = await this.repository
      .createQueryBuilder('reservation')
      .where('reservation.commonAreaId = :commonAreaId', { commonAreaId })
      .andWhere('reservation.status IN (:...statuses)', {
        statuses: ['pending', 'confirmed'],
      })
      .andWhere('reservation.startsAt < :endsAt', { endsAt: period.endsAt })
      .andWhere('reservation.endsAt > :startsAt', { startsAt: period.startsAt })
      .getOne();

    return entity ? ReservationMapper.toDomain(entity) : null;
  }

  async findById(reservationId: string): Promise<Reservation | null> {
    const entity = await this.repository.findOneBy({ reservationId });
    return entity ? ReservationMapper.toDomain(entity) : null;
  }

  async save(reservation: Reservation): Promise<void> {
    await this.repository.save(ReservationMapper.toPersistence(reservation));
  }
}
