# 04-06 - Registro de Alteracoes

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Ator:** Morador / Cond?mino
**Destino:** `docs/planejamento/01/`
**Fonte:** pacote de planejamento do UC01 e issue existente no GitHub.
**Situacao:** O caso ja possui implementacao parcial. A etapa RED cobre a antecedencia minima, regra documentada mas ainda ausente no comportamento atual.

## Alteracoes permitidas

- UC01: um teste unitario adicional, sem producao, e os artefatos desta etapa.
- UC02-UC12: somente documentacao de bloqueio e prontidao; nenhum codigo de producao ou teste hipotetico.

## Commit e push

Branch de trabalho: `test/issue-1-uc01-red-periodo-antecedencia`.

Arquivo de teste alterado:

`src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts`

O diff adiciona somente o cenario RED de antecedencia minima. Os artefatos
Markdown desta etapa tambem serao versionados; as exclusoes locais existentes
fora desse escopo permanecem unstaged.

Commit real:

`9b424ccced9b17c0aa59b0513ec12f69bd95bdb6`

Mensagem:

`test(uc01): add RED test for minimum reservation advance (ref #1)`

Push real:

`origin/test/issue-1-uc01-red-periodo-antecedencia`

O push configurou o upstream da branch com sucesso.
