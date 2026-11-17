# Execucao do Planejamento no GitHub

**Data:** 10 de novembro de 2026  
**Repositorio:** [MyCondo-Sistema-Corporativo/mycondo_backend](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend)  
**Branch:** `master`  
**GitHub Project:** [Planejamento - MyCondo - Casos de Uso UC01-UC12](https://github.com/orgs/MyCondo-Sistema-Corporativo/projects/1)

## Resultado

As issues existentes foram consultadas e reutilizadas. Nenhuma issue duplicada foi criada.

- Epic existente: [#3](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/3)
- UC01 existente: [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
- UC02 a UC12: [#4](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4) a [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14)
- Todos os itens foram adicionados ao Project.
- Todos os itens permanecem abertos e foram posicionados em `Backlog`.

## Rastreabilidade

| ID provisório | Issue | Caso de uso | Estado no board | URL |
|---|---:|---|---|---|
| UC01 | #1 | Solicitar reserva de área comum | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1) |
| EPIC | #3 | Primeiro slice - UC01 | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/3) |
| UC02 | #4 | Confirmar reserva mediante pagamento ou aprovação | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4) |
| UC03 | #5 | Cancelar reserva | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5) |
| UC04 | #6 | Registrar recebimento de encomenda | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6) |
| UC05 | #7 | Entregar encomenda | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/7) |
| UC06 | #8 | Autorizar e registrar acesso | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/8) |
| UC07 | #9 | Abrir ocorrência | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9) |
| UC08 | #10 | Aprovar orçamento de ordem de serviço | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10) |
| UC09 | #11 | Executar ordem de serviço | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/11) |
| UC10 | #12 | Registrar e conciliar pagamento | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/12) |
| UC11 | #13 | Publicar comunicado | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/13) |
| UC12 | #14 | Realizar votação em assembleia | Backlog | [issue](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14) |

## Labels confirmadas

As labels específicas de domínio, camada e caso de uso já estavam criadas:

- `domain:reservations`, `domain:portaria`, `domain:maintenance`,
  `domain:finance`, `domain:communication`, `domain:assembly`
- `type:feature`
- `layer:application`
- `usecase:uc01` até `usecase:uc12`

## Status do Project

O GitHub criou o campo padrão `Status` com `Todo`, `In Progress` e `Done`.
Para preservar esse campo e atender ao fluxo de cinco estados do planejamento,
foi criado o campo operacional `Workflow Status` com:

`Backlog` -> `Ready` -> `In Progress` -> `In Review` -> `Done`

Todos os itens foram definidos como `Backlog`. Nenhum item foi movido para
`In Progress`, `In Review` ou `Done`, pois os casos UC02-UC12 ainda não estão
implementados e o UC01 permanece parcialmente implementado.

## Observacao sobre autenticacao

O GitHub CLI foi autenticado como `ViniciusNunes01` com os escopos necessários
para consultar o repositório e os Projects. Em computador compartilhado, executar
`gh auth logout` ao finalizar o trabalho.
