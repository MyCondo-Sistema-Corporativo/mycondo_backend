# Consolidacao Material 04 — Desenvolvimento Colaborativo, Git, TDD RED e Draft PR

**Sistema:** MyCondo — Plataforma Integrada de Gestao de Condominios
**Data:** 17 de novembro de 2026
**Responsavel:** Vinicius Martins Nunes

---

## 1. Visao Geral e Matriz de Cobertura

O Material 04 estabelece a ponte entre o planejamento teorico e a primeira alteracao controlada no codigo-fonte, ancorada na fase **RED** do TDD.

| UC | Nome | Issue | Situacao Material 04 | Branch de Trabalho | Estado no Project |
|---|---|---|---|---|---|
| **UC01** | Solicitar reserva de area comum | #1 | **Executado (RED Real)** | `test/issue-1-uc01-red-periodo-antecedencia` (PR #15) | `In Progress` |
| **UC02** | Confirmar reserva mediante pagamento ou aprovacao | #4 | Planejado / Bloqueio DoR | `feature/issue-4-uc02-confirmar-reserva-test` | `Backlog` |
| **UC03** | Cancelar reserva | #5 | Planejado / Bloqueio DoR | `feature/issue-5-uc03-cancelar-reserva-test` | `Backlog` |
| **UC04** | Registrar recebimento de encomenda | #6 | Planejado / Bloqueio DoR | `feature/issue-6-uc04-recebimento-encomenda-test` | `Backlog` |
| **UC05** | Entregar encomenda | #7 | Planejado / Bloqueio DoR | `feature/issue-7-uc05-entrega-encomenda-test` | `Backlog` |
| **UC06** | Autorizar e registrar acesso | #8 | Planejado / Bloqueio DoR | `feature/issue-8-uc06-controle-acesso-test` | `Backlog` |
| **UC07** | Abrir ocorrencia | #9 | Planejado / Bloqueio DoR | `feature/issue-9-uc07-abrir-ocorrencia-test` | `Backlog` |
| **UC08** | Aprovar orcamento de ordem de servico | #10 | Planejado / Bloqueio DoR | `feature/issue-10-uc08-aprovar-orcamento-test` | `Backlog` |
| **UC09** | Executar ordem de servico | #11 | Planejado / Bloqueio DoR | `feature/issue-11-uc09-executar-os-test` | `Backlog` |
| **UC10** | Registrar e conciliar pagamento | #12 | Planejado / Bloqueio DoR | `feature/issue-12-uc10-conciliar-pagamento-test` | `Backlog` |
| **UC11** | Publicar comunicado | #13 | Planejado / Bloqueio DoR | `feature/issue-13-uc11-publicar-comunicado-test` | `Backlog` |
| **UC12** | Realizar votacao em assembleia | #14 | Planejado / Bloqueio DoR | `feature/issue-14-uc12-votacao-assembleia-test` | `Backlog` |

---

## 2. Principios e Diretrizes Metodologicas Aplicadas

1. **Rastreabilidade Estrita:** Cada caso de uso possui sua Issue vinculada, Sub-Issue prioritaria, branch padronizada e minuta de Draft PR.
2. **Especificacao Rigorosa AAA:** Todos os UCs possuem codigo de teste real em TypeScript/Vitest pronto para ser implementado na ordem planejada.
3. **Ausencia de Dados Inventados:** Nao foram forjados outputs de terminal ou hashes falsos para os casos de uso cujos modulos de producao ainda nao estao presentes.
4. **Respeito ao Ciclo TDD:** Nenhuma linha de codigo de producao foi antecipada nesta etapa.
5. **Governança do Kanban:** Apenas o UC01 foi movido para `In Progress` (com Draft PR aberto); os demais permanecem em `Backlog` ate o inicio de seus respectivos ciclos de desenvolvimento.

---

## 3. Total de Artefatos Gerados

- **96 arquivos individuais:** 12 casos de uso x 8 artefatos (`04-01` a `04-08`).
- **1 arquivo de consolidacao:** `04-00-consolidacao-material-04.md`.
