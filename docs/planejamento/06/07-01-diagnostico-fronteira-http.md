# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC06 — Autorizar e registrar acesso
**Issue Principal:** [#8](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/8)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/06/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC06 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/access-control/`
- Endpoint planejado: `POST /acessos/autorizar`
- DTO planejado: `AuthorizeAccessDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
