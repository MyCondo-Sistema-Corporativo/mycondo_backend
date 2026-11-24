# 05 — Fronteira HTTP, Controller e Mapeamento de Saída
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  

---

## 1. Unidade 5: Rota `GET /reservas` no `ReservationsController`

Adicionada a rota `@Get()` no `src/modules/reservations/http/reservations.controller.ts`:
- Injeta `ListReservationsUseCase` via token `LIST_RESERVATIONS_USE_CASE`;
- Delega a recuperação das reservas à camada de aplicação;
- Transforma cada entidade `Reservation` em `ReservationResponseDto` através de `ReservationHttpMapper.toResponseDto()`.

```typescript
  @Get()
  async list(): Promise<ReservationResponseDto[]> {
    const reservations = await this.listReservations.execute();
    return reservations.map((reservation) =>
      ReservationHttpMapper.toResponseDto(reservation),
    );
  }
```

---

## 2. DTO de Resposta Fechado e Isolamento do Contrato

O DTO `ReservationResponseDto` expõe exclusivamente os 8 atributos públicos aprovados no domínio:
- `reservationId: string`
- `residentId: string`
- `commonAreaId: string`
- `startsAt: string`
- `endsAt: string`
- `status: string`
- `createdAt: string`
- `updatedAt: string`

A conversão explícita pelo `ReservationHttpMapper` assegura que propriedades internas ou sensíveis da entidade não vazem na resposta HTTP.

---

## 3. Registro no Módulo (`ReservationsModule`)

O provider do caso de uso foi registrado sob o token `LIST_RESERVATIONS_USE_CASE` via `useFactory` injetando `RESERVATIONS_REPOSITORY`:

```typescript
    {
      provide: LIST_RESERVATIONS_USE_CASE,
      useFactory: (repository: IReservationsRepository) =>
        new ListReservationsUseCase(repository),
      inject: [RESERVATIONS_REPOSITORY],
    },
```
