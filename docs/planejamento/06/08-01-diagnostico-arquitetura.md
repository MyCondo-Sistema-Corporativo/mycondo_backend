# Artefato 08-01: Diagnóstico da Arquitetura e do Papel da Integração sem Mocks
**Caso de Uso:** UC06 — Gestão de Encomendas  
**Módulo:** `PackagesModule`  
**Status:** Bloqueado em Backlog (Aguardando conclusão e merge do Módulo de Encomendas)  

---

## 1. Mapeamento Arquitetural Conceitual
- **Borda HTTP:** Rota planejada `POST /encomendas`, DTO `ReceivePackageDto` e Exception Filter dedicado.
- **Camada de Aplicação:** `ReceivePackageUseCase` orquestrando regras de negócio sem acoplamento a banco ou HTTP.
- **Camada de Persistência:** Contrato `IPackagesRepository` com implementação em memória para testes integrados futuros.

## 2. Papel da Integração sem Mocks
Quando este caso de uso for desbloqueado para implementação, a verificação integrada sem mocks garantirá que a orquestração de aplicação e a persistência em memória operem de forma consistente antes da introdução de tabelas no PostgreSQL.
