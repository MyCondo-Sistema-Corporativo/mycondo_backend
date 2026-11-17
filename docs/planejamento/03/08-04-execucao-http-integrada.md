# Artefato 08-04: Execução HTTP Integrada no Ambiente Local
**Caso de Uso:** UC03 — Gestão de Inadimplência e Bloqueio  
**Status:** Bloqueado em Backlog  

---

## 1. Especificação de Requisições HTTP Previstas
- **Rota:** `POST /inadimplencias/bloqueio`
- **Payload Previsto:** `BlockDefaulterDto` estruturado em JSON.
- **Códigos HTTP Esperados:** 201/200 (Sucesso), 400 (Erro de entrada), 404 (Não encontrado), 409/422 (Regra de negócio violada).
- **Execução:** Não executada localmente devido ao status de Backlog.
