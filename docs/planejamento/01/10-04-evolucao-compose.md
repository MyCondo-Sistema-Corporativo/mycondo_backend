# Artefato 10-04: Evolução do Docker Compose (`compose.yaml`)
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Configuração Consolidada do `compose.yaml`

O arquivo `compose.yaml` foi evoluído para orquestrar a API NestJS em conjunto com o PostgreSQL, preservando os dados do volume existente:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: mycondo-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USERNAME:-mycondo_user}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-change_this_only_for_local_development}
      POSTGRES_DB: ${DB_NAME:-mycondo_db}
    ports:
      - "5432:5432"
    volumes:
      - mycondo_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USERNAME:-mycondo_user} -d ${DB_NAME:-mycondo_db}"]
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    container_name: mycondo-api
    restart: unless-stopped
    build:
      context: .
      dockerfile: Dockerfile
    image: mycondo-api:dev
    ports:
      - "${PORT:-3200}:3200"
    environment:
      PORT: 3200
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME:-mycondo_user}
      DB_PASSWORD: ${DB_PASSWORD:-change_this_only_for_local_development}
      DB_NAME: ${DB_NAME:-mycondo_db}
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  mycondo_postgres_data:
```

---

## 2. Validação Estrutural

A validação foi executada via `docker-compose config` com código de retorno 0:
* Os dois serviços (`postgres` e `api`) foram sintetizados corretamente na rede compartilhada `mycondo-backend_default`.
* O volume persistente `mycondo_postgres_data` está devidamente ancorado no PostgreSQL.
* O healthcheck com `pg_isready` garante que a API só inicialize após o PostgreSQL aceitar conexões.
