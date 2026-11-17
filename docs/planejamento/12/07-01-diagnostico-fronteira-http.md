# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC12 — Realizar votacao em assembleia
**Issue Principal:** [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/12/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC12 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/assemblies/`
- Endpoint planejado: `POST /assembleias/:id/votar`
- DTO planejado: `CastVoteDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
