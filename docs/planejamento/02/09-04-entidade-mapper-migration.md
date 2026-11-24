# Artefato 09-04: Entidade ORM, Mapper e Migration
**Caso de Uso:** UC02 — Cancelar Reserva de Área Comum  
**Status:** Bloqueado em Backlog  

---

## 1. Planejamento de Persistência
- Entidade `ReservationOrmEntity` mapeando as colunas da tabela `reservations`.
- Mapper desacoplado convertendo entre domínio e entidade ORM.
- Migration DDL para criação da tabela e índices relacionais.
