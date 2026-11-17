# 04-06 — Registro de Alteracoes (Commit e Push)

**UC:** UC02 — Confirmar reserva mediante pagamento ou aprovacao
**Issue:** [#4](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/02/`

---

## 1. Politica de Commits Atomicos e Semanticos

Quando o teste RED for fisicamente executado na branch dedicada:

- **Adicao seletiva:** Adicionar exclusivamente o arquivo de teste e interfaces indispensaveis (`git add src/modules/reservations/use-cases/confirm-reservation.use-case.spec.ts`).
- **Padrao de Mensagem:** Conventional Commits com referencia a Issue:
  ```bash
  git commit -m "test(02): add failing test for Confirmar reserva pendente mediante rece... (ref #4)"
  ```
- **Publicacao Remota:**
  ```bash
  git push origin feature/issue-4-uc02-confirmar-reserva-test
  ```

---

## 2. Registro Atual do Repositorio

- **Commits de Codigo para UC02:** Nenhum commit artificial gerado nesta etapa.
- **Commits de Documentacao:** Os artefatos deste planejamento estao armazenados em `docs/planejamento/02/`.
- **Rastreabilidade:** Mantida estritamente com a Issue [#4](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4).
