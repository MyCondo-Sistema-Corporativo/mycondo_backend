# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC10 — Registrar e conciliar pagamento
**Issue:** [#12](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/12)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/10/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/finance/use-cases/reconcile-payment.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(10): add failing test for Registrar liquidacao de cobranca bancari... (ref #12)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-12-uc10-conciliar-pagamento-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC10:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/10/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#12](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/12).
