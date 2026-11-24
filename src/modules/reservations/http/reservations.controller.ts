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
import { ReservationResponseDto } from './reservation-response.dto.js';
import { ReservationHttpMapper } from './reservation-http.mapper.js';
import {
  RESERVE_COMMON_AREA_USE_CASE,
  ReserveCommonAreaUseCase,
} from '../use-cases/reserve-common-area.use-case.js';
import {
  LIST_RESERVATIONS_USE_CASE,
  ListReservationsUseCase,
} from '../use-cases/list-reservations.use-case.js';
import {
  RESERVATIONS_REPOSITORY,
} from '../repositories/reservations.repository.interface.js';
import type { IReservationsRepository } from '../repositories/reservations.repository.interface.js';
import { Inject } from '@nestjs/common';

@Controller('reservas')
@UseFilters(ReservationExceptionFilter)
export class ReservationsController {
  constructor(
    @Inject(RESERVE_COMMON_AREA_USE_CASE)
    private readonly reserveCommonArea: ReserveCommonAreaUseCase,
    @Inject(LIST_RESERVATIONS_USE_CASE)
    private readonly listReservations: ListReservationsUseCase,
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: IReservationsRepository,
  ) {}

  @Get()
  async list(): Promise<ReservationResponseDto[]> {
    const reservations = await this.listReservations.execute();
    return reservations.map((reservation) =>
      ReservationHttpMapper.toResponseDto(reservation),
    );
  }

  @Post()
  async create(@Body() body: ReserveCommonAreaDto): Promise<ReservationResponseDto> {
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

    return ReservationHttpMapper.toResponseDto(reservation);
  }

  @Get(':reservationId')
  async findById(
    @Param('reservationId', new ParseUUIDPipe()) reservationId: string,
  ): Promise<ReservationResponseDto> {
    const reservation =
      await this.reservationsRepository.findById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }

    return ReservationHttpMapper.toResponseDto(reservation);
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
}

