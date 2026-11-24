# Artefato 10-05: Rede, Portas e Variáveis de Ambiente
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Comunicação entre Serviços na Rede Docker

| Parâmetro | Execução no Host (Local) | Execução via Docker Compose |
| :--- | :--- | :--- |
| **Hostname do Banco (`DB_HOST`)** | `127.0.0.1` ou `localhost` | `postgres` (nome do serviço Compose) |
| **Porta do Banco (`DB_PORT`)** | `5432` (porta publicada) | `5432` (porta interna na rede Docker) |
| **Rede de Comunicação** | Rede de loopback do host | `mycondo-backend_default` |
| **Porta HTTP da API (`PORT`)** | `3200` | `3200` (mapeada para `3200` no host) |

> [!NOTE]
> Quando o backend roda dentro do contêiner `mycondo-api`, `localhost` refere-se ao próprio contêiner da aplicação. A conexão com o banco deve obrigatoriamente apontar para o nome do serviço `postgres`, cuja resolução de DNS é realizada automaticamente pelo Docker Engine.

---

## 2. Isolamento de Ambientes

* **Banco de Desenvolvimento Containerizado:** `mycondo_db` servido na porta interna 5432 / host 5432 pelo serviço `postgres`.
* **Banco Exclusivo de Testes:** Mantido isolado para execução de testes automatizados com `vitest.config.integration.ts`, garantindo que testes com banco nunca afetem o banco de desenvolvimento containerizado.
