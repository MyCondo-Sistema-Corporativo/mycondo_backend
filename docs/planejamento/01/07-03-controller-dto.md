# 07-03 — Implementacao do Controller e DTO

**UC:** UC01 — Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Codigo do DTO de Entrada

**Arquivo:** `src/modules/reservations/http/reserve-common-area.dto.ts`

```typescript
export class ReserveCommonAreaDto {
  residentId!: string;
  commonAreaId!: string;
  startsAt!: string;
  endsAt!: string;
}
```

---

## 2. Codigo do Controller HTTP

**Arquivo:** `src/modules/reservations/http/reservations.controller.ts`

```typescript
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
```

---

## 3. Distincao entre Validacao HTTP e Regras de Negocio

- **Validacao na Fronteira HTTP:** Os metodos `parseDate` e `requireText` asseguram que `residentId` e `commonAreaId` sejam strings nao vazias e que `startsAt` e `endsAt` sejam representacoes ISO-8601 validas, devolvendo `400 Bad Request` antes de invocar o servico.
- **Regras de Negocio (Dominio/Aplicacao):** A verificacao de periodo futuro (`startsAt > now`), ordem temporal (`startsAt < endsAt`), conflito de sobreposicao de agenda e adimplencia do morador sao executadas exclusivamente no use case e na entidade `ReservationPeriod`, devolvendo erros traduzidos pelo `ReservationExceptionFilter` (403, 409, 422).
