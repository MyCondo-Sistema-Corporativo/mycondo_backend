# Artefato 08-07: Análise das Limitações da Persistência In-Memory e Preparação Conceitual para Banco Real
**Caso de Uso:** UC08 — Manutenção Preventiva  
**Status:** Bloqueado em Backlog  

---

## 1. Limitações Críticas Aplicadas a Este Caso de Uso
- Volatilidade dos dados de `UC08 — Manutenção Preventiva` se mantidos em memória RAM.
- Falta de integridade referencial com tabelas principais (Condomínio, Morador, Área Comum).
- Concorrência de escrita sem transações ACID.

## 2. Planejamento Conceitual para PostgreSQL
- Tabela dedicada no schema público com chave primária UUID e índices em chaves estrangeiras.
- Entidade TypeORM mapeando relacionamentos e colunas de auditoria (`created_at`, `updated_at`).
