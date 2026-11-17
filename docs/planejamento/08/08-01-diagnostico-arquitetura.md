# Artefato 08-01: Diagnóstico da Arquitetura e do Papel da Integração sem Mocks
**Caso de Uso:** UC08 — Manutenção Preventiva  
**Módulo:** `MaintenanceModule`  
**Status:** Bloqueado em Backlog (Aguardando conclusão e merge do Módulo de Manutenção)  

---

## 1. Mapeamento Arquitetural Conceitual
- **Borda HTTP:** Rota planejada `POST /manutencoes`, DTO `ScheduleMaintenanceDto` e Exception Filter dedicado.
- **Camada de Aplicação:** `ScheduleMaintenanceUseCase` orquestrando regras de negócio sem acoplamento a banco ou HTTP.
- **Camada de Persistência:** Contrato `IMaintenanceRepository` com implementação em memória para testes integrados futuros.

## 2. Papel da Integração sem Mocks
Quando este caso de uso for desbloqueado para implementação, a verificação integrada sem mocks garantirá que a orquestração de aplicação e a persistência em memória operem de forma consistente antes da introdução de tabelas no PostgreSQL.
