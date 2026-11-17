# 05-01 - Diagnostico RED

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Situacao:** Em GREEN
**Diretorio:** `docs/planejamento/01/`

O RED do Material 04 foi valido: o teste de antecedencia minima executou e falhou porque o caso aceitava uma reserva iniciada em 01/01/2026. A falha era comportamental, nao de sintaxe ou ambiente.

Teste: `src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts`

Comando RED: `pnpm vitest run src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts`

Saida RED: 1 teste falhou e 3 passaram; a Promise resolveu uma `Reservation` em vez de rejeitar.

Componente ausente: validacao de antecedencia em `ReservationPeriod`. O contrato ja utilizava `InvalidReservationPeriodException`. Autorizada a passagem para GREEN.
