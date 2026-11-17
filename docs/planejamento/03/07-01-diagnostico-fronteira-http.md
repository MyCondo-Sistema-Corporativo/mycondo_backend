# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC03 — Cancelar reserva
**Issue Principal:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/03/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC03 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/reservations/`
- Endpoint planejado: `POST /reservas/:id/cancelar`
- DTO planejado: `CancelReservationDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
