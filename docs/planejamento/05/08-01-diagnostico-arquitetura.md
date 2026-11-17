# Artefato 08-01: Diagnóstico da Arquitetura e do Papel da Integração sem Mocks
**Caso de Uso:** UC05 — Registro de Ocorrências  
**Módulo:** `IncidentsModule`  
**Status:** Bloqueado em Backlog (Aguardando conclusão e merge do Módulo de Ocorrências)  

---

## 1. Mapeamento Arquitetural Conceitual
- **Borda HTTP:** Rota planejada `POST /ocorrencias`, DTO `CreateIncidentDto` e Exception Filter dedicado.
- **Camada de Aplicação:** `ReportIncidentUseCase` orquestrando regras de negócio sem acoplamento a banco ou HTTP.
- **Camada de Persistência:** Contrato `IIncidentsRepository` com implementação em memória para testes integrados futuros.

## 2. Papel da Integração sem Mocks
Quando este caso de uso for desbloqueado para implementação, a verificação integrada sem mocks garantirá que a orquestração de aplicação e a persistência em memória operem de forma consistente antes da introdução de tabelas no PostgreSQL.
