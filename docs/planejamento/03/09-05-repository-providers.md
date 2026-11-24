# Artefato 09-05: Repositório TypeORM e Configuração de Providers
**Caso de Uso:** UC03 — Gestão de Inadimplência e Bloqueio  
**Status:** Bloqueado em Backlog  

---

## 1. Repositório e Módulo
O adaptador `TypeOrmDefaultersRepository` será injetado no módulo da funcionalidade sob o token correspondente via `TypeOrmModule.forFeature([DefaulterOrmEntity])`.
