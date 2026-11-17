# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC09 — Executar ordem de servico
**Issue:** [#11](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/11)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/09/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/work-orders/use-cases/execute-work-order.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(09): add failing test for Registrar inicio e conclusao de servico ... (ref #11)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-11-uc09-executar-os-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC09:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/09/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#11](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/11).
