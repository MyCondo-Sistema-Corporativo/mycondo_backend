# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC04 — Registrar recebimento de encomenda
**Issue Principal:** [#6](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/04/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC04 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/deliveries/`
- Endpoint planejado: `POST /encomendas`
- DTO planejado: `ReceivePackageDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
