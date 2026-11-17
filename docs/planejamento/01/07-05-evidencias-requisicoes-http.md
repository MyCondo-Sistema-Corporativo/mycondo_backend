# 07-05 — Evidencias das Requisicoes HTTP Reais

**UC:** UC01 — Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Ferramenta e Ambiente de Execucao

- **Ferramentas:** Arquivo declarativo `requests/reservations.http` e suite E2E com `supertest` em `test/reservations.e2e-spec.ts`.
- **Servidor:** NestJS na porta 3200 (`http://localhost:3200`).
- **Endpoint:** `POST /reservas`

---

## 2. Cenario 1 — Requisicao com Dados Validos (Sucesso)

**Requisicao:**
```http
POST http://localhost:3200/reservas
Content-Type: application/json

{
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-11-20T18:00:00.000Z",
  "endsAt": "2026-11-20T22:00:00.000Z"
}
```

**Resposta HTTP Observada:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "reservationId": "a90df1b8-67cb-4fc4-b1c4-14b537c2221f",
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-11-20T18:00:00.000Z",
  "endsAt": "2026-11-20T22:00:00.000Z",
  "status": "pending",
  "createdAt": "2026-11-17T17:54:43.704Z",
  "updatedAt": "2026-11-17T17:54:43.704Z"
}
```

---

## 3. Cenario 2 — Requisicao com Dados Invalidos na Fronteira (400 Bad Request)

**Requisicao com payload vazio/invalido:**
```http
POST http://localhost:3200/reservas
Content-Type: application/json

{
  "residentId": "",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "data-invalida",
  "endsAt": "2026-11-20T22:00:00.000Z"
}
```

**Resposta HTTP Observada:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "statusCode": 400,
  "message": "startsAt must be an ISO-8601 date.",
  "error": "Bad Request"
}
```

A requisicao foi barrada na fronteira HTTP antes de invocar o caso de uso ou gravar no banco de dados.
