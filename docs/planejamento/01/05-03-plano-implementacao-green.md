# 05-03 - Plano de Implementacao GREEN

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Situacao:** Em GREEN
**Diretorio:** `docs/planejamento/01/`

| Arquivo | Responsabilidade | Estado | Alteracao minima | Criterio |
|---|---|---|---|---|
| `src/modules/reservations/value-objects/reservation-period.ts` | Proteger invariantes temporais | Aceitava inicio passado | Rejeitar `startsAt <= new Date()` com `InvalidReservationPeriodException` | Teste RED de antecedencia passa |
| `src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts` | Testar caso de uso | Fixtures temporais antigas | Atualizar somente datas de fixtures para futuro | Suite sem regressao |
| `src/modules/reservations/value-objects/reservation-period.spec.ts` | Testar periodos adjacentes | Fixture antiga | Atualizar somente datas de fixture | Teste existente continua passando |

Nao foram alterados contratos, persistencia, controller ou assercoes.
