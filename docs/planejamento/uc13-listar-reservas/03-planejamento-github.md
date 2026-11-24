# 03 — Proposta de Planejamento no GitHub
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  
**Status:** Proposta para Avaliação do Estudante (Nenhuma issue criada automaticamente)  

---

## 1. Issue Principal (Epic)

- **Título:** `[UC13] Listar Reservas de Área Comum`
- **Labels:** `epic`, `backend`, `reservations`, `ready`
- **Descrição:** Implementação de ponta a ponta do caso de uso de consulta da coleção de reservas (UC13), permitindo a recuperação de reservas cadastradas através de endpoint HTTP `GET /reservas`, com persistência em memória e PostgreSQL via TypeORM.

---

## 2. Decomposição em Sub-Issues

| Sub-Issue | Título Proposto | Camada | Dependência | Responsável |
|---|---|---|---|---|
| `SUB-01` | Contrato do Repositório: operação aditiva `findAll` | Domínio / Contratos | Nenhuma | A definir |
| `SUB-02` | Caso de Uso de Aplicação `ListReservationsUseCase` | Aplicação | SUB-01 | A definir |
| `SUB-03` | Adaptadores de Persistência (InMemory e TypeORM) | Infraestrutura | SUB-01, SUB-02 | A definir |
| `SUB-04` | Endpoint HTTP `GET /reservas` e DTO de Coleção | Apresentação / HTTP | SUB-02 | A definir |
| `SUB-05` | Testes Automatizados de Contrato e Regressão | Testes / QA | SUB-03, SUB-04 | A definir |
| `SUB-06` | Cenários REST Client `.http` e Documentação Técnica | Documentação / Verificação | SUB-04, SUB-05 | A definir |

---

## 3. Fluxo no GitHub Project
- **Estados:** `Backlog` -> `Ready` -> `In Progress` -> `In Review` -> `Done`
- **Política de WIP:** Máximo de 2 itens em `In Progress` simultaneamente.
- **Rastreabilidade de Branches:** Padrão `feature/uc13-listar-reservas`.
