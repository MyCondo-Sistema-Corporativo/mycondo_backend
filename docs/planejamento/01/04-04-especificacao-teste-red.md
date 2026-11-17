# 04-04 - Especificacao do Teste RED

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Ator:** Morador / Cond?mino
**Destino:** `docs/planejamento/01/`
**Fonte:** pacote de planejamento do UC01 e issue existente no GitHub.
**Situacao:** O caso ja possui implementacao parcial. A etapa RED cobre a antecedencia minima, regra documentada mas ainda ausente no comportamento atual.

## Criterio selecionado

O primeiro teste verifica que uma solicitacao com inicio anterior ao instante atual e rejeitada com erro de dominio.

## Nivel

Teste unitario do caso de uso, seguindo Arrange-Act-Assert. O teste utiliza a implementacao e os doubles ja existentes, sem criar comportamento de producao.

## Arquivo

`src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts` (somente UC01).

## Comando

`pnpm vitest run src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts`

## Restricao

A etapa termina em RED. Nenhuma alteracao em entidade, handler, controller ou repositorio sera feita para satisfazer o teste.
