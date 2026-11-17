# 05-04 - Implementacao GREEN

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Situacao:** Em GREEN
**Diretorio:** `docs/planejamento/01/`

## Producao

Em `ReservationPeriod`, a condicao temporal agora inclui `startsAt <= new Date()`. Quando verdadeira, a excecao existente `InvalidReservationPeriodException` e lancada. Isso satisfaz diretamente a assercao do teste RED sem introduzir nova classe ou dependencia.

## Testes

Os testes que usavam 10/10/2026 foram movidos para 10/12/2026 apenas como dados de preparacao, pois a nova regra corretamente rejeita datas passadas. As assercoes permaneceram iguais.

## Postergado

Clock injetavel, antecedencia configuravel e regras de calendario ficam para REFACTOR/etapas posteriores.
