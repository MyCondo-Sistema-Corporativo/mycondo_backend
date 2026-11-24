import { BadRequestException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';
import { ReservationsController } from './reservations.controller.js';

describe('ReservationsController (HTTP Boundary)', () => {
  let controller: ReservationsController;
  let reserveCommonAreaMock: { execute: ReturnType<typeof vi.fn> };
  let listReservationsMock: { execute: ReturnType<typeof vi.fn> };
  let reservationsRepositoryMock: { findById: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    reserveCommonAreaMock = {
      execute: vi.fn(),
    };
    listReservationsMock = {
      execute: vi.fn(),
    };
    reservationsRepositoryMock = {
      findById: vi.fn(),
    };

    controller = new ReservationsController(
      reserveCommonAreaMock as any,
      listReservationsMock as any,
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

  it('Teste 3 — não expor propriedades internas do domínio no DTO de resposta HTTP (contrato fechado)', async () => {
    // Arrange: entidade com propriedade interna que não pertence ao contrato público
    const startsAt = new Date('2026-12-15T18:00:00.000Z');
    const endsAt = new Date('2026-12-15T22:00:00.000Z');
    const reservationWithInternalData = new Reservation(
      'reservation-uuid-99',
      'resident-999',
      'churrasqueira-01',
      new ReservationPeriod(startsAt, endsAt),
      ReservationStatus.PENDING,
      new Date('2026-11-17T12:00:00.000Z'),
      new Date('2026-11-17T12:00:00.000Z'),
    );

    // Injeta propriedade interna/sensível no objeto retornado pelo UseCase
    (reservationWithInternalData as any).internalAuditNote = 'segredo-auditoria-sindico';
    (reservationWithInternalData as any)._internalHash = 'hash-sigiloso-de-seguranca';

    reserveCommonAreaMock.execute.mockResolvedValueOnce(reservationWithInternalData);

    const dto = {
      residentId: 'resident-999',
      commonAreaId: 'churrasqueira-01',
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
    };

    // Act
    const response = await controller.create(dto);

    // Assert: asserção fechada (toEqual) comprovando que apenas os campos do contrato público são retornados
    expect(response).toEqual({
      reservationId: 'reservation-uuid-99',
      residentId: 'resident-999',
      commonAreaId: 'churrasqueira-01',
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      status: ReservationStatus.PENDING,
      createdAt: '2026-11-17T12:00:00.000Z',
      updatedAt: '2026-11-17T12:00:00.000Z',
    });

    // Asserções explícitas de não vazamento
    expect((response as any).internalAuditNote).toBeUndefined();
    expect((response as any)._internalHash).toBeUndefined();
  });

  it('Teste 4 — GET /reservas: delegar ao ListReservationsUseCase e retornar array de DTOs', async () => {
    // Arrange
    const startsAt = new Date('2026-12-15T18:00:00.000Z');
    const endsAt = new Date('2026-12-15T22:00:00.000Z');
    const reservation = new Reservation(
      'reservation-uuid-1',
      'resident-1',
      'common-area-1',
      new ReservationPeriod(startsAt, endsAt),
      ReservationStatus.PENDING,
      new Date('2026-11-17T12:00:00.000Z'),
      new Date('2026-11-17T12:00:00.000Z'),
    );

    listReservationsMock.execute.mockResolvedValueOnce([reservation]);

    // Act
    const result = await controller.list();

    // Assert
    expect(listReservationsMock.execute).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      reservationId: 'reservation-uuid-1',
      residentId: 'resident-1',
      commonAreaId: 'common-area-1',
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      status: ReservationStatus.PENDING,
      createdAt: '2026-11-17T12:00:00.000Z',
      updatedAt: '2026-11-17T12:00:00.000Z',
    });
  });

  it('Teste 5 — GET /reservas: retornar array vazio quando não houver reservas cadastradas (FA01 / CA03)', async () => {
    // Arrange
    listReservationsMock.execute.mockResolvedValueOnce([]);

    // Act
    const result = await controller.list();

    // Assert
    expect(listReservationsMock.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});

