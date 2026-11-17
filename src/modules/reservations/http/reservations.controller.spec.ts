import { BadRequestException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';
import { ReservationsController } from './reservations.controller.js';

describe('ReservationsController (HTTP Boundary)', () => {
  let controller: ReservationsController;
  let reserveCommonAreaMock: { execute: ReturnType<typeof vi.fn> };
  let reservationsRepositoryMock: { findById: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    reserveCommonAreaMock = {
      execute: vi.fn(),
    };
    reservationsRepositoryMock = {
      findById: vi.fn(),
    };

    controller = new ReservationsController(
      reserveCommonAreaMock as any,
      reservationsRepositoryMock as any,
    );
  });

  it('Teste 1 — delegar com sucesso ao caso de uso com dados validos e retornar representacao estruturada', async () => {
    // Arrange
    const startsAt = new Date('2026-12-10T18:00:00.000Z');
    const endsAt = new Date('2026-12-10T22:00:00.000Z');
    const expectedReservation = new Reservation(
      'reservation-uuid-1',
      'resident-101',
      'party-room-1',
      new ReservationPeriod(startsAt, endsAt),
      ReservationStatus.PENDING,
    );

    reserveCommonAreaMock.execute.mockResolvedValueOnce(expectedReservation);

    const dto = {
      residentId: 'resident-101',
      commonAreaId: 'party-room-1',
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    };

    // Act
    const response = await controller.create(dto);

    // Assert
    expect(reserveCommonAreaMock.execute).toHaveBeenCalledTimes(1);
    expect(reserveCommonAreaMock.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        residentId: 'resident-101',
        commonAreaId: 'party-room-1',
        startsAt,
        endsAt,
      }),
    );

    expect(response.residentId).toBe('resident-101');
    expect(response.commonAreaId).toBe('party-room-1');
    expect(response.status).toBe(ReservationStatus.PENDING);
    expect(response.startsAt).toBe(startsAt.toISOString());
    expect(response.endsAt).toBe(endsAt.toISOString());
  });

  it('Teste 2 — rejeitar entrada invalida na fronteira HTTP sem invocar o servico de aplicacao', async () => {
    // Arrange
    const invalidDto = {
      residentId: '   ', // campo vazio / invalido
      commonAreaId: 'party-room-1',
      startsAt: 'data-invalida',
      endsAt: '2026-12-10T22:00:00.000Z',
    };

    // Act & Assert
    await expect(controller.create(invalidDto)).rejects.toThrow(
      BadRequestException,
    );

    // Comprova que o servico de aplicacao nao foi chamado
    expect(reserveCommonAreaMock.execute).not.toHaveBeenCalled();
  });
});
