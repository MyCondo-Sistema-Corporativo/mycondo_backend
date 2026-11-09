import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { Reservation } from '../../../modules/reservations/entities/reservation.entity.js';
import { ReservationPeriod } from '../../../modules/reservations/value-objects/reservation-period.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';

export class ReservationMapper {
  static toDomain(entity: ReservationOrmEntity): Reservation {
    return new Reservation(
      entity.reservationId,
      entity.residentId,
      entity.commonAreaId,
      new ReservationPeriod(entity.startsAt, entity.endsAt),
      entity.status as ReservationStatus,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toPersistence(reservation: Reservation): ReservationOrmEntity {
    const entity = new ReservationOrmEntity();
    entity.reservationId = reservation.reservationId;
    entity.residentId = reservation.residentId;
    entity.commonAreaId = reservation.commonAreaId;
    entity.startsAt = reservation.period.startsAt;
    entity.endsAt = reservation.period.endsAt;
    entity.status = reservation.currentStatus;
    entity.createdAt = reservation.createdAt;
    entity.updatedAt = reservation.updatedAt;
    return entity;
  }
}
