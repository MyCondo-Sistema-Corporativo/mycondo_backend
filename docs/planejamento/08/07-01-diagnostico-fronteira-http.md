# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC08 — Aprovar orcamento de ordem de servico
**Issue Principal:** [#10](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/08/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC08 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/work-orders/`
- Endpoint planejado: `POST /ordens-servico/:id/aprovar-orcamento`
- DTO planejado: `ApproveBudgetDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
