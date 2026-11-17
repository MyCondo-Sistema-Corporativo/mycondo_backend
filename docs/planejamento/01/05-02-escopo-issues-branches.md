# 05-02 - Escopo, Issues e Branches

**UC:** UC01 - Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Situacao:** Em GREEN
**Diretorio:** `docs/planejamento/01/`

Cenario A: teste e implementacao permanecem na mesma branch do Draft PR.

- Branch: `teste/issue-1-uc01-red-periodo-antecedencia`
- Base: `master`
- Draft PR: https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/pull/15
- Issue: #1
- DoR: modulo, teste e contrato disponiveis; revisor humano ainda pendente.

A implementacao fica limitada a antecedencia minima. Nao inclui cobranca, notificacoes, politica externa ou refatoracao. Risco: fixtures antigos usavam datas passadas; foram atualizados para datas futuras sem alterar assercoes.
