# Artefato 08-01: Diagnóstico da Arquitetura e do Papel da Integração sem Mocks
**Caso de Uso:** UC10 — Prestação de Contas  
**Módulo:** `FinanceModule`  
**Status:** Bloqueado em Backlog (Aguardando conclusão e merge do Módulo Financeiro)  

---

## 1. Mapeamento Arquitetural Conceitual
- **Borda HTTP:** Rota planejada `POST /prestacao-contas`, DTO `SubmitFinancialReportDto` e Exception Filter dedicado.
- **Camada de Aplicação:** `SubmitFinancialReportUseCase` orquestrando regras de negócio sem acoplamento a banco ou HTTP.
- **Camada de Persistência:** Contrato `IFinancialReportsRepository` com implementação em memória para testes integrados futuros.

## 2. Papel da Integração sem Mocks
Quando este caso de uso for desbloqueado para implementação, a verificação integrada sem mocks garantirá que a orquestração de aplicação e a persistência em memória operem de forma consistente antes da introdução de tabelas no PostgreSQL.
