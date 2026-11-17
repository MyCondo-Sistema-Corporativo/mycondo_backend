# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC11 — Publicar comunicado
**Issue:** [#13](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/13)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/11/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/communications/use-cases/publish-announcement.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(11): add failing test for Criar e publicar comunicado oficial para... (ref #13)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-13-uc11-publicar-comunicado-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC11:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/11/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#13](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/13).
