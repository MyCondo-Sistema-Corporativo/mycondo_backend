import { Reservation } from '../entities/reservation.entity.js';
import { ReservationResponseDto } from './reservation-response.dto.js';

export class ReservationHttpMapper {
  static toResponseDto(reservation: Reservation): ReservationResponseDto {
    return {
      reservationId: reservation.reservationId,
      residentId: reservation.residentId,
      commonAreaId: reservation.commonAreaId,
      startsAt: reservation.period.startsAt.toISOString(),
      endsAt: reservation.period.endsAt.toISOString(),
      status: reservation.currentStatus,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
    };
  }
}
