# 08 — Auditoria de Pureza Arquitetural
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  

---

## 1. Verificação das Camadas e Inversão de Dependências

A implementação do UC13 foi auditada conforme as diretrizes do Material 12:

| Camada | Arquivos Avaliados | Conformidade Arquitetural |
|---|---|:---:|
| **Domínio Puro** | `Reservation`, `ReservationPeriod`, `ReservationStatus` | **100% Conforme:** Nenhuma dependência de NestJS, Express, TypeORM ou bibliotecas externas. |
| **Contrato de Repositório** | `IReservationsRepository` | **100% Conforme:** Interface pura baseada em tipos de domínio (`Reservation`), sem vazamento de decorators ou classes do ORM. |
| **Aplicação** | `ListReservationsUseCase` | **100% Conforme:** Orquestra a listagem recebendo a abstração do repositório por injeção de dependência. |
| **Infraestrutura / Persistência** | `TypeOrmReservationsRepository`, `ReservationMapper` | **100% Conforme:** Isola o TypeORM e delega a conversão ao mapper de persistência. |
| **Apresentação / Borda HTTP** | `ReservationsController`, `ReservationHttpMapper`, `ReservationResponseDto` | **100% Conforme:** Mapeamento explícito de saída impedindo vazamento de campos internos. |

---

## 2. Diferenciação dos Dois Mappers
- **Mapper de Persistência (`ReservationMapper`):** Responsável exclusivo pela conversão bidirecional `Reservation <-> ReservationOrmEntity` na camada de persistência.
- **Mapper HTTP (`ReservationHttpMapper`):** Responsável exclusivo pela conversão unidirecional `Reservation -> ReservationResponseDto` na fronteira HTTP.
