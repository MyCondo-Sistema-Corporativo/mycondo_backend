# 04-05 — Evidencias do TDD RED

**UC:** UC09 — Executar ordem de servico
**Issue:** [#11](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/11)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/09/`

---

## 1. Estado da Execucao do Teste

| Item | Situacao |
|---|---|
| Modulo de Producao | Nao implementado fisicamente (`src/modules/work-orders/`) |
| Arquivo de Teste | Especificado no Artefato 04-04, nao criado fisicamente |
| Execucao do Runner | Bloqueada antes da execucao |
| Categoria de Bloqueio | **Bloqueio Arquitetural / DoR Incompleta** |

---

## 2. Justificativa Anti-Simulacao (Regra de Ouro)

Em respeito as diretrizes didaticas e rigor de Engenharia de Software:
1. **Nao sao inventadas saidas falsas de terminal.** Um erro simulado de importacao ou syntax error nao constitui um RED funcional legitimo.
2. Para que um RED seja valido, o framework de testes precisa compilar e executar o teste, falhando exclusivamente pela **ausencia do comportamento esperado** (assercao negocial).
3. Como os contratos para `src/modules/work-orders/` ainda nao foram adicionados ao repositorio, a execucao real geraria erro de modulo inexistente (falha de ambiente/compilacao, nao RED negocial).

---

## 3. Condicao de Desbloqueio para a Fase RED Real

1. Criacao dos stubs de interfaces minimas no modulo `src/modules/work-orders/`.
2. Criacao do arquivo `src/modules/work-orders/use-cases/execute-work-order.use-case.spec.ts`.
3. Execucao de `pnpm vitest run src/modules/work-orders/use-cases/execute-work-order.use-case.spec.ts` registrando a falha funcional:
   - Exemplo esperado: `AssertionError: expected PENDING to be CONFIRMED` ou `MethodNotImplementedException`.
