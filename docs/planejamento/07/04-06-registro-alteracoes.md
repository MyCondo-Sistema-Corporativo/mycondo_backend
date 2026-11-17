# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC07 — Abrir ocorrencia
**Issue:** [#9](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/07/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/occurrences/use-cases/open-occurrence.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(07): add failing test for Registrar ocorrencia pelo morador com ca... (ref #9)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-9-uc07-abrir-ocorrencia-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC07:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/07/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#9](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9).
