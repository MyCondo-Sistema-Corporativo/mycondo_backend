# 04-04 - Especificacao do Teste RED

**UC:** UC04 - Registrar recebimento de encomenda
**Issue:** [#6](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6)
**Ator:** Portaria / Operador
**Destino:** `docs/planejamento/04/`
**Fonte:** pacote de planejamento do UC04 e issue existente no GitHub.
**Situacao:** Sem modulo de encomendas implementado. A execucao fica bloqueada ate existirem contratos e implementacao do caso.

## Criterio selecionado

Nao ha teste RED executado: o caso nao possui modulo, contrato ou endpoint implementado, e um import hipotetico seria uma falha de ambiente, nao um RED valido.

## Nivel

Teste unitario do caso de uso, seguindo Arrange-Act-Assert. O teste utiliza a implementacao e os doubles ja existentes, sem criar comportamento de producao.

## Arquivo

`src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts` (somente UC01).

## Comando

`pnpm vitest run src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts`

## Restricao

A etapa termina em RED. Nenhuma alteracao em entidade, handler, controller ou repositorio sera feita para satisfazer o teste.
