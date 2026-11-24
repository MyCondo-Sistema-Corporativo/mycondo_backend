# Artefato 09-03: Configuração do TypeORM e DataSource
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Configuração no `AppModule` (`src/app.module.ts`)

O TypeORM é configurado de forma assíncrona no NestJS utilizando `TypeOrmModule.forRootAsync`, garantindo que credenciais e parâmetros sejam injetados a partir do `.env`:

```typescript
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
```

> [!IMPORTANT]
> `synchronize: false` está ativado permanentemente para impedir que o TypeORM altere o schema do banco automaticamente em tempo de execução. Todo o versionamento da base é realizado via migrations.

---

## 2. Configuração do DataSource da CLI (`src/database/data-source.ts`)

```typescript
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ReservationOrmEntity } from '../infrastructure/persistence/reservations/reservation.orm-entity.js';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ReservationOrmEntity],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
```

Scripts de automação no `package.json`:
* `pnpm migration:run`: executa `typeorm-ts-node-esm -d src/database/data-source.ts migration:run`.
* `pnpm migration:revert`: reverte a última migration aplicada com controle de versão.
