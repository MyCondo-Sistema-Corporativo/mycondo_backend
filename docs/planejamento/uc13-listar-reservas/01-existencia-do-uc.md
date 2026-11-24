# 01 — Parecer de Verificação de Existência do Caso de Uso
**Caso de Uso Avaliado:** UC13 — Listar Reservas  
**Entidade:** `Reservation`  
**Módulo:** `src/modules/reservations/`  
**Data:** 24/11/2026  

---

## 1. Tabela de Busca Real no Workspace

| O que procurei | Onde | O que encontrei |
|---|---|---|
| Documento de caso de uso de listagem de reservas | `docs/`, `docs/planejamento/`, `prompts/` | **Nada encontrado.** Os documentos cobrem UC01 a UC12 (reserva, cancelamento, portaria, etc.). Não há menção a listagem de reservas. |
| Método de listagem (`findAll`, `list`, `listReservations`) | `src/modules/reservations/` | **Nada encontrado.** O `IReservationsRepository` possui apenas `findActiveConflict`, `findById` e `save`. |
| Rota HTTP de listagem (`GET /reservas`) | `src/modules/reservations/http/reservations.controller.ts` | **Apenas consulta por ID encontrada (`GET /reservas/:reservationId`).** Não existe rota `@Get()` para coleção. |
| Cenários de teste de listagem | `test/`, `src/modules/reservations/**/*.spec.ts` | **Nada encontrado.** Os testes existentes cobrem apenas criação, conflito, elegibilidade e busca por UUID individual. |

---

## 2. Decisão Técnica Fundamentada

**Decisão A — O Caso de Uso NÃO Existe.**

Não há especificação prévia, contrato de repositório, caso de uso na camada de aplicação ou rota HTTP para a listagem da entidade `Reservation`.  
Portanto, a especificação será criada a partir do molde estrutural do `REF` (UC01), formalizando o identificador `UC13 — Listar Reservas`.
