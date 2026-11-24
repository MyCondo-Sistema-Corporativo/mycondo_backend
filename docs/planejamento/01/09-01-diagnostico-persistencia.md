# Artefato 09-01: Diagnóstico da Persistência e Linha de Base
**Caso de Uso:** UC01 — Reservar Área Comum  
**Projeto:** MyCondo Backend  
**Data:** 17/11/2026  
**Diretório de Destino:** `docs/planejamento/01/`  
**Branch:** `test/issue-1-uc01-red-periodo-antecedencia`  

---

## 1. Identificação do Projeto e Contratos Preservados

A nona etapa do projeto acadêmico MyCondo realiza a transição da persistência volátil em memória para a persistência real relacional com **PostgreSQL** e **TypeORM**, mantendo a integridade estrita de todos os contratos construídos nos Materiais 01 a 08:

* **Entidade de Domínio:** `Reservation` (`src/modules/reservations/entities/reservation.entity.ts`)
* **Value Object:** `ReservationPeriod` (`src/modules/reservations/value-objects/reservation-period.ts`)
* **Contrato de Repositório:** `IReservationsRepository` e token `RESERVATIONS_REPOSITORY` (`src/modules/reservations/repositories/reservations.repository.interface.ts`)
* **Serviço de Aplicação / Caso de Uso:** `ReserveCommonAreaUseCase` e token `RESERVE_COMMON_AREA_USE_CASE` (`src/modules/reservations/use-cases/reserve-common-area.use-case.ts`)
* **Controlador HTTP:** `ReservationsController` (`src/modules/reservations/http/reservations.controller.ts`)
* **DTO de Entrada:** `ReserveCommonAreaDto` (`src/modules/reservations/http/reserve-common-area.dto.ts`)

Nenhuma regra de negócio ou assinatura de método do domínio/aplicação foi alterada para acomodar o ORM.

---

## 2. Infraestrutura PostgreSQL, Docker e TypeORM Inspecionada

1. **Docker Compose (`compose.yaml`):**
   - Serviço `postgres` utilizando imagem oficial `postgres:17`.
   - Nome do contêiner: `mycondo-postgres`.
   - Porta mapeada: `5432:5432`.
   - Volume persistente: `mycondo_postgres_data`.
   - Healthcheck configurado via `pg_isready`.
2. **Configuração TypeORM no NestJS (`src/app.module.ts`):**
   - Módulo dinâmico `TypeOrmModule.forRootAsync` lendo variáveis de ambiente via `ConfigService`.
   - Propriedade `synchronize: false` rigorosamente respeitada.
   - Entidade registrada: `ReservationOrmEntity`.
3. **CLI DataSource (`src/database/data-source.ts`):**
   - Configurado com `dotenv/config`, lendo variáveis `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`.
   - Padrão de migrations: `src/database/migrations/*.ts`.
4. **Migration Existente:**
   - `src/database/migrations/1792519206237-CreateReservations.ts` com schema completo para a tabela `reservations`.

---

## 3. Sub-Issue de Persistência, DoR e Política de WIP

* **Sub-Issue Correspondente:** `SUB-04` — Persistência Real e Repositório TypeORM de Reservas.
* **Definition of Ready (DoR):** Atendida integralmente com base no diagnóstico e planejamento conceitual do artefato `08-07`.
* **Política de WIP:** Mantida em progresso controlado na branch de trabalho sem abertura de branches paralelas conflitantes.

---

## 4. Evidência Real da Linha de Base dos Testes

Execução prévia da suíte completa de testes antes das modificações:
```text
$ vitest run
 RUN  v4.1.11 C:/Users/Vinicius/Desktop/SISTEMAS CORPORATIVOS/system/mycondo-backend/mycondo-backend/mycondo-backend

 ✓ src/modules/reservations/value-objects/reservation-period.spec.ts (2 tests) 14ms
 ✓ src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts (4 tests) 12ms
 ✓ src/modules/reservations/http/reservations.controller.spec.ts (2 tests) 16ms
 ✓ src/app.controller.spec.ts (1 test) 822ms
 ✓ src/modules/reservations/http/reservations-integrated.spec.ts (6 tests) 765ms

 Test Files  5 passed (5)
      Tests  15 passed (15)
   Start at  15:20:34
   Duration  3.70s
```
**Diagnóstico:** Linha de base 100% verde (15 testes passando em 5 arquivos).
