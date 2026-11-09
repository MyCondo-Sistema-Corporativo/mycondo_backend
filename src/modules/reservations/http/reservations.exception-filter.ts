import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidReservationPeriodException } from '../../../common/exceptions/invalid-reservation-period.exception.js';
import { ReservationConflictException } from '../../../common/exceptions/reservation-conflict.exception.js';
import { ResidentNotEligibleException } from '../../../common/exceptions/resident-not-eligible.exception.js';

@Catch(
  InvalidReservationPeriodException,
  ReservationConflictException,
  ResidentNotEligibleException,
)
export class ReservationExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | InvalidReservationPeriodException
      | ReservationConflictException
      | ResidentNotEligibleException,
    host: ArgumentsHost,
  ): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof ReservationConflictException
        ? HttpStatus.CONFLICT
        : exception instanceof ResidentNotEligibleException
          ? HttpStatus.FORBIDDEN
          : HttpStatus.UNPROCESSABLE_ENTITY;

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
