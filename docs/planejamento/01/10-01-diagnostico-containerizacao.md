# Artefato 10-01: Diagnóstico da Containerização e Linha de Base
**Caso de Uso:** UC01 — Reservar Área Comum  
**Projeto:** MyCondo Backend  
**Data:** 17/11/2026  
**Diretório de Destino:** `docs/planejamento/01/`  
**Branch:** `test/issue-1-uc01-red-periodo-antecedencia`  

---

## 1. Identificação do Projeto e Escopo da Containerização

A décima etapa do desenvolvimento do projeto MyCondo tem como finalidade encapsular a aplicação NestJS e sua infraestrutura relacional em contêineres Docker padronizados, preservando integralmente todos os contratos, componentes e regras construídos nos Materiais 01 a 09:

* **Arquitetura Alvo:** `Cliente HTTP -> mycondo-api (Contêiner NestJS) -> mycondo-postgres (Contêiner PostgreSQL) -> mycondo_postgres_data (Volume Persistente)`
* **Contratos Preservados:** `Reservation`, `IReservationsRepository`, `ReserveCommonAreaUseCase`, `ReservationsController`, `ReserveCommonAreaDto`.
* **Porta HTTP da API:** `3200`
* **Porta do Banco PostgreSQL:** `5432`

---

## 2. Auditoria dos Arquivos Existentes no Repositório

1. **Dockerfile:** Inexistente no início da etapa. Necessidade de criação de Dockerfile multi-stage com Node.js 24 e pnpm 12.
2. **.dockerignore:** Inexistente no início da etapa. Necessidade de criação para proteger segredos, `.env`, `node_modules` e artefatos de compilação.
3. **compose.yaml:** Existente previamente contendo apenas o serviço `postgres` (`image: postgres:17`, volume `mycondo_postgres_data`). Necessidade de evolução mínima com a adição do serviço `api`.
4. **package.json:** Scripts existentes auditados; adição dos scripts de produção `migration:show:prod` e `migration:run:prod` apontando para o DataSource compilado em `dist/database/data-source.js`.

---

## 3. Linha de Base dos Testes Automatizados

Execução real realizada antes das modificações estruturais da containerização:
* **Suíte Unitária e em Memória (`pnpm test`):**
  ```text
  Test Files  5 passed (5)
       Tests  15 passed (15)
    Duration  4.01s
  ```
* **Suíte de Integração com Banco (`pnpm test:integration`):**
  ```text
  Test Files  1 passed (1)
       Tests  1 passed (1)
    Duration  1.68s
  ```
* **Compilação TypeScript (`pnpm build`):**
  ```text
  $ nest build
  (Concluído com código de saída 0 - dist/ gerado integralmente)
  ```
