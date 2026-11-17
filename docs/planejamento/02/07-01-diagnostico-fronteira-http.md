# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC02 — Confirmar reserva mediante pagamento ou aprovacao
**Issue Principal:** [#4](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/02/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC02 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/reservations/`
- Endpoint planejado: `POST /reservas/:id/confirmar`
- DTO planejado: `ConfirmReservationDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
