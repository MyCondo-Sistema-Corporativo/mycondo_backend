# Artefato 10-06: Migrations no Runtime e Inicialização dos Contêineres
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Scripts de Migration para Produção no `package.json`

Adicionados scripts para permitir a inspeção e execução de migrations sobre os arquivos compilados em `dist/`:

```json
"migration:show:prod": "typeorm migration:show -d dist/database/data-source.js",
"migration:run:prod": "typeorm migration:run -d dist/database/data-source.js"
```

---

## 2. Inicialização dos Contêineres via Docker Compose

### Comando Padronizado de Inicialização
```bash
docker-compose up -d --build api
```

### Ordem de Inicialização e Dependências:
1. O Compose inicia o serviço `postgres` (`mycondo-postgres`).
2. O healthcheck monitora o PostgreSQL com `pg_isready -U mycondo_user -d mycondo_db`.
3. Assim que o PostgreSQL atinge o estado `healthy`, o serviço `api` (`mycondo-api`) é iniciado.
4. O processo Node.js executa `node dist/main.js`, conectando ao PostgreSQL via TypeORM e disponibilizando a rota `POST /reservas` na porta 3200.
