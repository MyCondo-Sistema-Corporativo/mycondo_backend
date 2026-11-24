# 00 — Caso de Uso de Referência e Mapeamento de Fontes
**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso Alvo:** UC13 — Listar Reservas  
**Caso de Uso de Referência (REF):** UC01 — Solicitar Reserva de Área Comum (`docs/planejamento/01/01-01-analise-tecnica.md`)  
**Data:** 24/11/2026  

---

## 1. Mapeamento de Fontes no Workspace

Conforme a Seção 2.1 do processo, foi realizada a verificação em modo somente leitura da localização física das fontes esperadas:

| Fonte Esperada | Encontrada? | Caminho Real no Workspace | Observação |
|---|:---:|---|---|
| Modelo de Especificação (`REF`) | **Sim** | `docs/planejamento/01/01-01-analise-tecnica.md` | Especificação completa do UC01 adotada como molde estrutural de 13 seções. |
| Planejamento Inicial (Mat. 01) | **Sim** | `docs/planejamento/01/01-01-*.md` até `01-13-*.md` | Epic, Sub-issues, Matriz de Rastreabilidade e Critérios de Aceite do UC01. |
| Equipe e Revisão (Mat. 02) | **Sim** | `docs/planejamento/01/02-*.md` e `02-00-*.md` | Matriz de permissões, papéis e Definition of Ready (DoR). |
| Implementação TDD (Mat. 04-06) | **Sim** | `docs/planejamento/01/04-*.md`, `05-*.md`, `06-*.md` | Ciclo TDD RED-GREEN-REFACTOR e testes unitários do domínio. |
| Borda HTTP NestJS (Mat. 07) | **Sim** | `docs/planejamento/01/07-*.md` | Controller, DTOs, ValidationPipe e Exception Filter. |
| Integração Backend (Mat. 08) | **Sim** | `docs/planejamento/01/08-*.md` | Testes integrados com Vitest e Supertest sem mocks de Service/Repository. |
| Persistência PostgreSQL (Mat. 09) | **Sim** | `docs/planejamento/01/09-*.md` | Entidade ORM, Mapper de persistência, migrations e TypeOrmRepository. |
| Containerização Docker (Mat. 10) | **Sim** | `docs/planejamento/01/10-*.md`, `Dockerfile`, `compose.yaml` | Imagem multi-stage Node 24/pnpm 12 e orquestração Docker Compose. |
| Contratos HTTP Estáveis (Mat. 11) | **Sim** | `src/modules/reservations/http/reservation-http.mapper.ts` | DTO de resposta fechado e separação explícita entre mapper HTTP e de persistência. |
| `docs/adr/`, `method/`, `project-profile.md` | **Não** | *(Ausentes no workspace)* | **Observação:** O projeto utiliza governança baseada na pasta `docs/planejamento/` sem os scripts opcionais de `method/`. A validação será realizada manualmente de forma estrita. |

---

## 2. Estrutura Padrão Extraída do UC de Referência (Régua de 13 Seções)

A especificação do `ALVO` seguirá rigorosamente a régua de 13 seções comprovada no `REF`:
1. Identificação e Título do Caso de Uso;
2. Objetivo e Escopo Funcional (o que entra e o que não entra);
3. Atores Envolvidos e Permissões;
4. Pré-condições e Pós-condições (sucesso e falha);
5. Fluxo Principal de Execução;
6. Fluxos Alternativos (FA) e de Exceção (FE);
7. Regras de Negócio (RN) classificadas como confirmadas ou candidatas;
8. Validações de Entrada e Parâmetros de Consulta;
9. Requisitos Funcionais (RF) com mapeamento dos campos retornados;
10. Considerações Arquiteturais e Unidades de Trabalho;
11. Critérios de Aceite (CA) verificáveis e rastreáveis;
12. Escopo do Trabalho e Limitações;
13. Rastreabilidade (Requisito/Regra -> Critério de Aceite).
