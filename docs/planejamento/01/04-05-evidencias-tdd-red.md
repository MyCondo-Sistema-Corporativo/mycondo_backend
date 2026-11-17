# 04-05 - Evidencias do TDD RED

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Ator:** Morador / Cond?mino
**Destino:** `docs/planejamento/01/`
**Fonte:** pacote de planejamento do UC01 e issue existente no GitHub.
**Situacao:** O caso ja possui implementacao parcial. A etapa RED cobre a antecedencia minima, regra documentada mas ainda ausente no comportamento atual.

## UC01

Comando executado:

```text
pnpm vitest run src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts
```

Resultado real:

```text
Test Files  1 failed (1)
Tests       1 failed | 3 passed (4)
AssertionError: promise resolved "Reservation{ ... }" instead of rejecting
at src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts:79
```

A falha e funcional: o caso atualmente aceita e persiste uma reserva iniciada
em `2026-01-01`, embora a regra de antecedencia minima esteja documentada. O
teste executou corretamente e falhou na expectativa de
`InvalidReservationPeriodException`; nao houve erro de sintaxe, importacao ou
configuracao do runner.

## UC02-UC12
Sem evidencia de execucao. O caso esta bloqueado antes do RED porque nao existe modulo/contrato executavel. Nenhum resultado de teste sera inventado.

**Status:** RED valido comprovado.
