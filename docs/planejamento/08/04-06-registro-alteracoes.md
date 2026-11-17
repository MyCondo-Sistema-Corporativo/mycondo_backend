# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC08 — Aprovar orcamento de ordem de servico
**Issue:** [#10](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/08/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/work-orders/use-cases/approve-work-order-budget.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(08): add failing test for Aprovar orcamento de ordem de servico de... (ref #10)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-10-uc08-aprovar-orcamento-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC08:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/08/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#10](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10).
