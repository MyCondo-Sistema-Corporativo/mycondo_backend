# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC12 — Realizar votacao em assembleia
**Issue:** [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/12/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/assemblies/use-cases/cast-assembly-vote.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(12): add failing test for Registrar voto de morador adimplente em ... (ref #14)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-14-uc12-votacao-assembleia-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC12:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/12/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14).
