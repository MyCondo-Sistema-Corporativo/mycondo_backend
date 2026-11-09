import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './modules/reservations/reservations.module.js';
import { ReservationOrmEntity } from './infrastructure/persistence/reservations/reservation.orm-entity.js';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env'
      }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT', '5432')),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [ReservationOrmEntity],
        synchronize: false,
        retryAttempts: 1,
        retryDelay: 500,
      }),
      inject: [ConfigService],
    }),
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }