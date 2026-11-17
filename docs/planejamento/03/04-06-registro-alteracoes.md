# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC03 — Cancelar reserva
**Issue:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/03/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/reservations/use-cases/cancel-reservation.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(03): add failing test for Cancelar reserva ativa (PENDING ou CONFI... (ref #5)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-5-uc03-cancelar-reserva-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC03:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/03/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5).
