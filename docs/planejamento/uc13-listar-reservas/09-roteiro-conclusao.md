# 09 — Roteiro de Conclusão e Governança
**Caso de Uso:** UC13 — Listar Reservas  
**Data:** 24/11/2026  

---

## 1. Tabela de Passos Operacionais de Conclusão

| Passo | Ação | Situação | Observações |
|:---:|---|:---:|---|
| 01 | Aprovação da Especificação do UC13 (Etapa 1) | **Feito** | Especificação validada no Gate pelo estudante. |
| 02 | Implementação TDD do Repositório e Caso de Uso | **Feito** | Ciclo RED-GREEN concluído com 2 testes unitários. |
| 03 | Implementação do Endpoint HTTP `GET /reservas` | **Feito** | Controller, DTO e testes de unidade concluídos. |
| 04 | Verificação de Regressão e Build Local | **Feito** | 21 testes aprovados (`pnpm test`) e `nest build` código 0. |
| 05 | Commit das alterações no Git | **Pendente (estudante)** | Sugerida criação da branch `feature/uc13-listar-reservas`. |
| 06 | Abertura de Pull Request para revisão por pares | **Pendente (estudante)** | Apontando para branch de integração da equipe. |
| 07 | Atualização do GitHub Project | **Pendente (estudante)** | Mover SUB-01 a SUB-06 para `In Review` / `Done`. |
| 08 | Merge na branch principal | **Pendente (estudante)** | Executar somente após revisão e autorização formal. |

---

## 2. Provas Disponíveis
- Suíte geral: 21 testes aprovados em 6 arquivos (`docs/planejamento/uc13-listar-reservas/06-testes-cobertura-regressao.md`).
- Auditoria de arquitetura: `docs/planejamento/uc13-listar-reservas/08-auditoria-arquitetural.md`.
- Cenários `.http`: `http-rest-client/reservas/uc13-listar-reservas/`.
