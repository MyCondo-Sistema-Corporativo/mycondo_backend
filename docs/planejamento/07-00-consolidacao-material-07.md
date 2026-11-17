# Consolidacao Material 07 — Da Aplicacao a API HTTP com NestJS

**Sistema:** MyCondo — Plataforma Integrada de Gestao de Condominios
**Data:** 17 de novembro de 2026
**Responsavel:** Vinicius Martins Nunes

---

## 1. Matriz Consolidada da Fronteira HTTP por Caso de Uso

| UC | Nome | Issue | Rota HTTP | Status Material 07 | Testes HTTP | Estado no Project |
|:---|:---|:---:|:---|:---:|:---:|:---:|
| **UC01** | Solicitar reserva de area comum | #1 | `POST /reservas` | **Concluido** | 2/2 aprovados (Suite 9/9) | `In Review` (SUB-04) |
| **UC02** | Confirmar reserva | #4 | `POST /reservas/:id/confirmar` | Bloqueado | N/A | `Backlog` |
| **UC03** | Cancelar reserva | #5 | `POST /reservas/:id/cancelar` | Bloqueado | N/A | `Backlog` |
| **UC04** | Registrar recebimento encomenda | #6 | `POST /encomendas` | Bloqueado | N/A | `Backlog` |
| **UC05** | Entregar encomenda | #7 | `POST /encomendas/:id/entregar` | Bloqueado | N/A | `Backlog` |
| **UC06** | Autorizar e registrar acesso | #8 | `POST /acessos/autorizar` | Bloqueado | N/A | `Backlog` |
| **UC07** | Abrir ocorrencia | #9 | `POST /ocorrencias` | Bloqueado | N/A | `Backlog` |
| **UC08** | Aprovar orcamento de OS | #10 | `POST /ordens-servico/:id/aprovar-orcamento` | Bloqueado | N/A | `Backlog` |
| **UC09** | Executar ordem de servico | #11 | `POST /ordens-servico/:id/executar` | Bloqueado | N/A | `Backlog` |
| **UC10** | Conciliar pagamento | #12 | `POST /pagamentos/conciliar` | Bloqueado | N/A | `Backlog` |
| **UC11** | Publicar comunicado | #13 | `POST /comunicados` | Bloqueado | N/A | `Backlog` |
| **UC12** | Votacao em assembleia | #14 | `POST /assembleias/:id/votar` | Bloqueado | N/A | `Backlog` |

---

## 2. Entregaveis Praticos Concluidos no Repositorio

1. **Controller NestJS:** `src/modules/reservations/http/reservations.controller.ts` delegando estritamente ao use case.
2. **DTO:** `src/modules/reservations/http/reserve-common-area.dto.ts`.
3. **Filtro de Excecoes:** `src/modules/reservations/http/reservations.exception-filter.ts` traduzindo regras de dominio em HTTP 403, 409 e 422.
4. **Modulo e Providers:** `src/modules/reservations/reservations.module.ts` configurado no `AppModule`.
5. **Testes Unitarios da Fronteira HTTP:** `src/modules/reservations/http/reservations.controller.spec.ts` (2 testes aprovados).
6. **Suite de Regressao:** 4 arquivos de teste, **9/9 testes aprovados no Vitest**.
7. **Documentacao:** 96 arquivos `07-*` individuais + consolidacao geral.
