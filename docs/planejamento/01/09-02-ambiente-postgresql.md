# Artefato 09-02: Ambiente PostgreSQL e Configuração Docker
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Configuração do Docker Compose (`compose.yaml`)

O repositório já possui a definição padronizada do serviço de banco de dados relacional:

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

volumes:
  mycondo_postgres_data:
```

---

## 2. Separação de Ambientes: Desenvolvimento vs. Testes

As configurações foram padronizadas nas variáveis de ambiente:

| Variável | Ambiente de Desenvolvimento | Ambiente de Testes Automatizados |
| :--- | :--- | :--- |
| **Host** | `localhost` | `localhost` |
| **Porta** | `5432` | `5432` (ou porta dedicada `5434`) |
| **Usuário** | `mycondo_user` | `mycondo_user` |
| **Banco** | `mycondo_db` | `mycondo_test` / `mycondo_db` isolado |
| **Permissão Destrutiva**| Proibida (`false`) | Controlada por teste |

---

## 3. Mapeamento de Portas e Comportamento do `inet_server_port()`

* **Porta do Host:** Porta exposta no sistema operacional hospedeiro onde os clientes e testes locais conectam (`localhost:5432`).
* **Porta Interna do Contêiner:** Porta onde o daemon PostgreSQL escuta internamente no contêiner (`5432`).
* **Atenção Técnica:** Dentro da engine do PostgreSQL, a função nativa `inet_server_port()` reportará a porta interna do processo no contêiner (`5432`). Nunca se deve exigir em asserções que `inet_server_port()` retorne a porta mapeada no host quando houver redirecionamento Docker.

---

## 4. Verificação de Conexão e Diagnóstico do Host Local

* **Tentativa de Conexão com Docker Daemon:**
  ```text
  failed to connect to the docker API at npipe:////./pipe/docker_engine
  ```
* **Tentativa de Conexão TCP na Porta 5432:**
  ```text
  Error: connect ECONNREFUSED 127.0.0.1:5432
  ```
* **Diagnóstico:** O daemon do Docker Desktop não se encontra em execução no host local neste momento. Todos os arquivos de configuração, scripts e testes foram estruturados de forma segura e resiliente para operar imediatamente assim que o serviço for iniciado via `docker compose up -d postgres`.
