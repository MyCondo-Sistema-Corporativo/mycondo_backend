# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC06 — Autorizar e registrar acesso
**Issue:** [#8](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/8)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/06/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/access-control/use-cases/authorize-access.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(06): add failing test for Autorizar e protocolar entrada de visita... (ref #8)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-8-uc06-controle-acesso-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC06:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/06/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#8](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/8).
