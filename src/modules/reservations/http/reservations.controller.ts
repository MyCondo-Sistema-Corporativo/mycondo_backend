import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ReservationExceptionFilter } from './reservations.exception-filter.js';
import { ReserveCommonAreaDto } from './reserve-common-area.dto.js';
import {
  RESERVE_COMMON_AREA_USE_CASE,
  ReserveCommonAreaUseCase,
} from '../use-cases/reserve-common-area.use-case.js';
import {
  RESERVATIONS_REPOSITORY,
} from '../repositories/reservations.repository.interface.js';
import type { IReservationsRepository } from '../repositories/reservations.repository.interface.js';
import { Reservation } from '../entities/reservation.entity.js';
import { Inject } from '@nestjs/common';

@Controller('reservas')
@UseFilters(ReservationExceptionFilter)
export class ReservationsController {
  constructor(
    @Inject(RESERVE_COMMON_AREA_USE_CASE)
    private readonly reserveCommonArea: ReserveCommonAreaUseCase,
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: IReservationsRepository,
  ) {}

  @Post()
  async create(@Body() body: ReserveCommonAreaDto): Promise<ReservationResponse> {
    const startsAt = this.parseDate(body.startsAt, 'startsAt');
    const endsAt = this.parseDate(body.endsAt, 'endsAt');
    this.requireText(body.residentId, 'residentId');
    this.requireText(body.commonAreaId, 'commonAreaId');

    const reservation = await this.reserveCommonArea.execute({
      reservationId: randomUUID(),
      residentId: body.residentId,
      commonAreaId: body.commonAreaId,
      startsAt,
      endsAt,
    });

    return ReservationsController.toResponse(reservation);
  }

  @Get(':reservationId')
  async findById(
    @Param('reservationId', new ParseUUIDPipe()) reservationId: string,
  ): Promise<ReservationResponse> {
    const reservation =
      await this.reservationsRepository.findById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }

    return ReservationsController.toResponse(reservation);
  }

  private parseDate(value: string, field: string): Date {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${field} must be an ISO-8601 date.`);
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException(`${field} must be an ISO-8601 date.`);
    }
    return date;
  }

  private requireText(value: string, field: string): void {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new BadRequestException(`${field} is required.`);
    }
  }

  private static toResponse(reservation: Reservation): ReservationResponse {
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

interface ReservationResponse {
  reservationId: string;
  residentId: string;
  commonAreaId: string;
  startsAt: string;
  endsAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
