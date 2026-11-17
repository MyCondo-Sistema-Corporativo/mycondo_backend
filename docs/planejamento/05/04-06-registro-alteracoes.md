# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC05 — Entregar encomenda
**Issue:** [#7](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/7)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/05/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/deliveries/use-cases/deliver-package.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(05): add failing test for Registrar baixa de encomenda em custodia... (ref #7)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-7-uc05-entrega-encomenda-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC05:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/05/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#7](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/7).
