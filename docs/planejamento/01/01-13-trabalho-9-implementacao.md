# Artefato 13 — Plano operacional do Trabalho 9

**Sistema:** MyCondo  
**Slice:** UC01 — Solicitar reserva de área comum  
**Dependência:** planejamento dos Artefatos 01–12

## Objetivo

Fechar o primeiro slice atravessando domínio, aplicação, porta,
TypeORM/PostgreSQL e HTTP. O resultado de sucesso deve ser uma reserva
`pending` recuperável; falhas de período, elegibilidade e conflito devem ser
observáveis sem gravação indevida.

## Decomposição executada

| Ordem | Entrega | Evidência |
|---:|---|---|
| 1 | Entidade ORM e migration | `src/infrastructure/persistence/reservations/`, `src/database/migrations/` |
| 2 | Mapper e repositório TypeORM | `reservation.mapper.ts`, `typeorm-reservations.repository.ts` |
| 3 | Providers e configuração NestJS | `reservations.module.ts`, `app.module.ts` |
| 4 | Controller, DTO e filtro | `src/modules/reservations/http/` |
| 5 | Ambiente e execução | `.env.example`, `compose.yaml`, `README.md` |
| 6 | Cenários reproduzíveis | `requests/reservations.http` |
| 7 | Relato e rastreabilidade | `docs/trabalho_9_sistema_condominio.md` |

## Matriz de rastreabilidade

| Regra/objetivo anterior | Implementação atual | Validação |
|---|---|---|
| Período inicia antes do fim | `ReservationPeriod` + check SQL | teste unitário e resposta 422 |
| Não sobrepor área ativa | use case + query de conflito | teste unitário e resposta 409 |
| Morador elegível | `IResidentEligibilityService` | teste unitário e resposta 403 |
| Preservar reserva | mapper/repository/migration | POST, GET e SELECT |
| Separar fronteiras | módulos distintos | build/lint e inspeção de imports |

## Critérios de aceite

- [x] `synchronize: false`;
- [x] `.env.example` sem segredo real e `.env` ignorado;
- [x] volume PostgreSQL nomeado e healthcheck;
- [x] migration reversível;
- [x] domínio sem dependência de ORM/HTTP;
- [x] Controller sem regra de conflito;
- [x] filtro para erros de domínio;
- [x] requisições HTTP versionadas;
- [x] build, lint e testes unitários executados;
- [ ] executar migration e E2E em PostgreSQL disponível, registrando saída real;
- [ ] preencher branch/hash final após publicação.

## Riscos e próximos itens

1. A elegibilidade configurada é um adaptador temporário até existir o contexto
   de moradores/IAM.
2. A consulta de conflito precisa de estratégia transacional/constraint de
   exclusão quando concorrência real for requisito.
3. O próximo slice deve implementar confirmação/cancelamento, sem misturar
   seus estados com a solicitação.

O relatório completo, contrato e comandos estão em
[`docs/trabalho_9_sistema_condominio.md`](../trabalho_9_sistema_condominio.md).
