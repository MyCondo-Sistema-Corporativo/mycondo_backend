# Artefato 08-04: Execução HTTP Integrada no Ambiente Local
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  
**Arquivo de Requisições:** `requests/reservations.http`  

---

## 1. Tabela de Rastreabilidade das Requisições HTTP

| # | Cenário Avaliado | Método & Rota | Entrada Principal | Status Esperado | Status Obtido | Validação de Persistência |
| :- | :--- | :--- | :--- | :-: | :-: | :--- |
| 1 | Sucesso: Reserva válida | `POST /reservas` | `startsAt`, `endsAt` futuros | 201 Created | 201 Created | Encontrada no repositório com status PENDING |
| 2 | Consulta de Reserva | `GET /reservas/:id` | UUID da reserva criada | 200 OK | 200 OK | Retorna payload idêntico ao persistido |
| 3 | Entrada Inválida (Borda) | `POST /reservas` | `residentId: "   "` | 400 Bad Request | 400 Bad Request | Nenhuma entidade criada no repositório |
| 4 | Conflito de Horário | `POST /reservas` | Período sobreposto | 409 Conflict | 409 Conflict | Nenhuma reserva duplicada criada |
| 5 | Morador Inadimplente | `POST /reservas` | `residentId: "inadimplente"` | 403 Forbidden | 403 Forbidden | Nenhuma reserva persistida |

---

## 2. Evidência de Payload: Criação com Sucesso (201)

### Requisição
```http
POST http://localhost:3200/reservas
Content-Type: application/json

{
  "residentId": "resident-101",
  "commonAreaId": "churrasqueira-01",
  "startsAt": "2026-12-15T18:00:00.000Z",
  "endsAt": "2026-12-15T22:00:00.000Z"
}
```

### Resposta
```json
{
  "reservationId": "9b64ea72-3599-4d6f-871f-0b32fb1cf89d",
  "residentId": "resident-101",
  "commonAreaId": "churrasqueira-01",
  "startsAt": "2026-12-15T18:00:00.000Z",
  "endsAt": "2026-12-15T22:00:00.000Z",
  "status": "pending",
  "createdAt": "2026-11-17T18:01:17.111Z",
  "updatedAt": "2026-11-17T18:01:17.111Z"
}
```
