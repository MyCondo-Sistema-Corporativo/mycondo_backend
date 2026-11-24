# Artefato 10-07: Verificação Operacional, Testes e Durabilidade
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Cadastro via Requisição HTTP na API Containerizada

```http
POST http://localhost:3200/reservas
Content-Type: application/json

{
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-12-28T18:00:00.000Z",
  "endsAt": "2026-12-28T22:00:00.000Z"
}
```

### Resposta JSON (201 Created)
```json
{
  "reservationId": "f7d2e489-4921-4ba2-b251-512ef90c3456",
  "residentId": "resident-1",
  "commonAreaId": "11111111-1111-4111-8111-111111111111",
  "startsAt": "2026-12-28T18:00:00.000Z",
  "endsAt": "2026-12-28T22:00:00.000Z",
  "status": "pending",
  "createdAt": "2026-11-17T19:20:00.000Z",
  "updatedAt": "2026-11-17T19:20:00.000Z"
}
```

---

## 2. Comprovação de Durabilidade Após Reinício da API

1. **Consulta SQL Inicial:**
   ```sql
   SELECT "reservationId", "residentId", "status" FROM "reservations" 
   WHERE "reservationId" = 'f7d2e489-4921-4ba2-b251-512ef90c3456';
   ```
   Registro confirmado com status `pending`.
2. **Reinício Exclusivo do Contêiner da API:**
   ```bash
   docker-compose restart api
   ```
   *(O contêiner `mycondo-postgres` e o volume persistente permanecem ativos e intactos).*
3. **Consulta SQL Posterior:**
   A mesma consulta confirma que a reserva permanece íntegra e acessível no PostgreSQL.
4. **Conclusão:** Durabilidade física e desacoplamento de ciclo de vida entre contêiner da aplicação e contêiner do banco comprovados.

---

## 3. Reexecução Completa das Suítes de Testes (Ausência de Regressões)

* **Suíte Unitária e Integrada em Memória (`pnpm test`):**
  15/15 testes aprovados em 5 arquivos (`15 passed (15)`).
* **Suíte de Integração PostgreSQL (`pnpm test:integration`):**
  1/1 teste aprovado com integridade total.
* **Build do Projeto (`pnpm build`):**
  Código 0 — compilação bem-sucedida.
