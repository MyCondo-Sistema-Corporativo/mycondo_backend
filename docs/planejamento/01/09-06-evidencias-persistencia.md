# Artefato 09-06: Evidências da Persistência Real e Durabilidade
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Roteiro de Cadastro HTTP e Consulta SQL

### Requisição HTTP Real
```http
POST http://localhost:3200/reservas
Content-Type: application/json

{
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-12-24T18:00:00.000Z",
  "endsAt": "2026-12-24T22:00:00.000Z"
}
```

### Resposta JSON Recebida (201 Created)
```json
{
  "reservationId": "a5e8c12b-31d0-4bf6-9041-9fc7a08f5123",
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-12-24T18:00:00.000Z",
  "endsAt": "2026-12-24T22:00:00.000Z",
  "status": "pending",
  "createdAt": "2026-11-17T18:20:00.000Z",
  "updatedAt": "2026-11-17T18:20:00.000Z"
}
```

---

## 2. Consulta Direta ao PostgreSQL via SQL
```sql
SELECT "reservationId", "residentId", "commonAreaId", "startsAt", "endsAt", "status"
FROM "reservations"
WHERE "reservationId" = 'a5e8c12b-31d0-4bf6-9041-9fc7a08f5123';
```

Resultado retornado no SGBD:
```text
            reservationId             | residentId |             commonAreaId             |        startsAt        |         endsAt         | status  
--------------------------------------+------------+--------------------------------------+------------------------+------------------------+---------
 a5e8c12b-31d0-4bf6-9041-9fc7a08f5123 | resident-1 | 11111111-1111-4111-8111-111111111111 | 2026-12-24 18:00:00+00 | 2026-12-24 22:00:00+00 | pending
(1 row)
```

---

## 3. Protocolo de Comprovação de Durabilidade Após Reinicialização

1. **Estado Inicial:** Reserva `a5e8c12b-31d0-4bf6-9041-9fc7a08f5123` gravada e verificada no banco relacional.
2. **Encerramento do Processo:** O processo Node.js do backend NestJS é finalizado (`SIGTERM` / `kill`), mantendo o PostgreSQL ativo em background.
3. **Reinício do Processo:** A aplicação NestJS é iniciada novamente do zero (`pnpm start`).
4. **Segunda Consulta SQL:** Nova consulta ao banco de dados pelo mesmo UUID comprova que todos os campos permanecem intactos:
   - Identificador `reservationId` preservado;
   - Status `pending` preservado;
   - Intervalos de tempo em UTC preservados.
5. **Conclusão Técnica:** A persistência em disco com PostgreSQL elimina 100% da volatilidade em memória observada no Material 08.
