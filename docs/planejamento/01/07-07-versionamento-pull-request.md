# 07-07 — Versionamento e Pull Request da Fronteira HTTP

**UC:** UC01 — Solicitar reserva de area comum
**Issue Principal:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Sub-Issue HTTP:** SUB-04 — Fronteira HTTP REST
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Rastreabilidade Git e Commits

- **Branch de Trabalho:** `test/issue-1-uc01-red-periodo-antecedencia`
- **Branch Remota:** `origin/feat/issue-1-solicitar-reserva`
- **Commits Associados a Camada HTTP:**
  - `0696885` — `feat: implementar trabalho 9 com persistencia postgres` (Controller, DTO, Module, migrations e E2E)
  - `f899fee` — `feat(uc01): implement minimum reservation advance (ref #1)`
  - Novo teste adicionado: `src/modules/reservations/http/reservations.controller.spec.ts`

---

## 2. Pull Request e GitHub Project

- **Pull Request Vinculado:** [Draft PR #15](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/pull/15)
- **Status no GitHub Project:**
  - `SUB-04` (Fronteira HTTP): **In Review** (com testes unitarios e E2E aprovados).
  - Issue Principal [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1): **In Progress** (mantida aberta ate conclusao de todos os slices).
- **Merge:** Nao executado prematuramente na `master`, respeitando a governanca de branches.
