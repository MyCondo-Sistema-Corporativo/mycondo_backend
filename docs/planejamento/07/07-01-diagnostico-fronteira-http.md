# 07-01 — Diagnostico da Fronteira HTTP

**UC:** UC07 — Abrir ocorrencia
**Issue Principal:** [#9](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9)
**Situacao:** Bloqueado
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/07/`

---

## 1. Estado da Fronteira HTTP

O caso de uso UC07 esta **bloqueado para implementacao da fronteira HTTP**:
- Modulo candidato: `src/modules/occurrences/`
- Endpoint planejado: `POST /ocorrencias`
- DTO planejado: `OpenOccurrenceDto`
- **Impedimento Tecnico:** A camada de aplicacao (servico GREEN) e os contratos de dominio nao foram implementados no repositorio.
- **DoR SUB-04:** Nao atende (dependencia direta do servico de aplicacao ausente).
