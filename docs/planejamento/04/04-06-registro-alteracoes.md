# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC04 — Registrar recebimento de encomenda
**Issue:** [#6](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/04/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/deliveries/use-cases/receive-package.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(04): add failing test for Registrar recebimento de pacote na porta... (ref #6)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-6-uc04-recebimento-encomenda-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC04:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/04/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#6](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6).
