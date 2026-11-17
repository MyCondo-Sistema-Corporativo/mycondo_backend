# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC11 — Publicar comunicado
**Issue Principal:** [#13](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/13)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/11/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC11 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/communications/`
- Endpoint planejado: `POST /comunicados`
- DTO planejado: `PublishAnnouncementDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
