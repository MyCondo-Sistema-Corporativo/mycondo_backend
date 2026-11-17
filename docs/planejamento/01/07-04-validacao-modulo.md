# 07-04 — Validacao e Composicao do Modulo NestJS

**UC:** UC01 — Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Composicao do Modulo `ReservationsModule`

**Arquivo:** `src/modules/reservations/reservations.module.ts`

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([ReservationOrmEntity])],
  controllers: [ReservationsController],
  providers: [
    {
      provide: RESERVATIONS_REPOSITORY,
      useFactory: (repository: Repository<ReservationOrmEntity>) =>
        new TypeOrmReservationsRepository(repository),
      inject: [getRepositoryToken(ReservationOrmEntity)],
    },
    {
      provide: RESIDENT_ELIGIBILITY_SERVICE,
      useClass: ConfiguredResidentEligibilityService,
    },
    {
      provide: RESERVE_COMMON_AREA_USE_CASE,
      useFactory: (
        repository: IReservationsRepository,
        eligibilityService: IResidentEligibilityService,
      ) => new ReserveCommonAreaUseCase(repository, eligibilityService),
      inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
    },
  ],
  exports: [RESERVATIONS_REPOSITORY],
})
export class ReservationsModule {}
```

---

## 2. Integracao no `AppModule` e Bootstrap

- **`src/app.module.ts`:** Importa `ReservationsModule`, `ConfigModule` e configura `TypeOrmModule.forRootAsync` com PostgreSQL.
- **`src/main.ts`:** Inicializa a aplicacao na porta `process.env.PORT ?? 3200`.
- **Compilacao:** `pnpm build` executado com sucesso (`nest build` exit code 0).
