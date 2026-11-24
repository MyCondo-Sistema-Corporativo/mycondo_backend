# 02 — Especificação de Caso de Uso: UC13 — Listar Reservas
**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC13 — Listar Reservas de Área Comum  
**Classificação:** Consulta / Listagem de Coleção  
**Status da Especificação:** Proposta Formalizada (Aguardando Validação do Estudante no Gate)  
**Data:** 24/11/2026  

---

## 1. Identificação
- **Código:** UC13
- **Título:** Listar reservas de área comum
- **Módulo:** `reservations` (`ReservationsModule`)
- **Tipo:** Consulta de coleção (Read-Only)

---

## 2. Objetivo e Escopo Funcional
- **Objetivo:** Permitir a recuperação estruturada da coleção de reservas de áreas comuns cadastradas no condomínio, retornando todos os atributos de cada reserva no formato padronizado de resposta, viabilizando a visualização de agendamentos por moradores e administração.
- **Escopo (Entra):**
  - Consulta à coleção de reservas através do endpoint HTTP `GET /reservas`;
  - Suporte a filtro opcional por `residentId` (morador) e `commonAreaId` (área comum);
  - Retorno de lista vazia (`200 OK` com `[]`) caso nenhum registro atenda aos critérios;
  - Desacoplamento arquitetural: UseCase na camada de aplicação delegando ao `IReservationsRepository`;
  - Mapeamento explícito via `ReservationHttpMapper` para `ReservationResponseDto[]`, assegurando a não exposição de detalhes internos.
- **Fora do Escopo (Não entra):**
  - Modificação, cancelamento ou aprovação de reservas (escopo de UC01, UC02, UC03);
  - Paginação complexa com cursor (mantida paginação simples ou listagem direta nesta versão inicial);
  - Exportação para relatórios PDF/Excel;
  - Mecanismos de cache distribuído (Redis).

---

## 3. Atores Envolvidos e Permissões
- **Morador / Condômino:** Pode consultar suas próprias reservas e a ocupação geral dos espaços comuns.
- **Síndico / Administrador:** Pode visualizar o histórico e o cronograma completo de reservas de todas as áreas do condomínio.
- *(Ponto a confirmar com o estudante: se a rota exige token de autenticação obrigatório já neste slice ou se atua publicamente no contexto local).*

---

## 4. Pré-condições e Pós-condições
- **Pré-condições:**
  1. O serviço backend `mycondo-backend` deve estar em execução e conectado à camada de dados (em memória ou PostgreSQL);
  2. A tabela `reservations` ou repositório em memória deve estar inicializado.
- **Pós-condições de Sucesso:**
  1. O sistema retorna código `200 OK`;
  2. O corpo da resposta contém um array JSON com as reservas encontradas;
  3. Cada elemento do array reflete estritamente os atributos públicos definidos.
- **Pós-condições de Falha:**
  1. Em caso de falha de comunicação com o repositório, nenhuma informação parcial é vazada e o sistema retorna erro 500/503 tratado.

---

## 5. Fluxo Principal de Execução (Caminho Feliz)
1. O cliente HTTP emite uma requisição `GET /reservas`.
2. O `ReservationsController` intercepta a requisição e invoca o caso de uso `ListReservationsUseCase.execute()`.
3. O `ListReservationsUseCase` aciona o contrato `IReservationsRepository.findAll()`.
4. O repositório recupera os registros e reconstitui as entidades de domínio `Reservation`.
5. O caso de uso devolve o array de entidades `Reservation[]` para a camada de apresentação.
6. O controller aplica `ReservationHttpMapper.toResponseDto()` para cada entidade, montando um array de `ReservationResponseDto`.
7. O sistema responde com status `200 OK` e o JSON da coleção.

---

## 6. Fluxos Alternativos e de Exceção
- **FA01 — Coleção Vazia:**
  - O repositório não localiza nenhuma reserva cadastrada;
  - O sistema responde com status `200 OK` e corpo `[]` (array vazio).
- **FA02 — Filtro por Área Comum:**
  - O cliente fornece query param `?commonAreaId=<UUID>`;
  - O repositório filtra apenas as reservas daquela área comum específica.
- **FE01 — Falha na Persistência:**
  - Ocorre falha de I/O ou conexão no repositório;
  - A camada de infraestrutura propaga exceção tratada;
  - A API retorna status `500 Internal Server Error` (ou `503 Service Unavailable`) sem expor stack trace SQL.

---

## 7. Regras de Negócio (RN)
- **RN01 (Composição Completa dos Dados - Confirmada):** Cada reserva listada deve conter exatamente os 8 atributos definidos no modelo de domínio: `reservationId`, `residentId`, `commonAreaId`, `startsAt`, `endsAt`, `status`, `createdAt`, `updatedAt`.
- **RN02 (Isolamento de Contrato - Confirmada):** A resposta da listagem não deve expor atributos internos, propriedades de ORM, flags temporárias ou senhas.
- **RN03 (Sucesso na Ausência de Registros - Confirmada):** A ausência de reservas não constitui erro de negócio nem 404; deve retornar `200 OK` com array vazio.
- **RN04 (Ordenação Cronológica Padrão - Confirmada):** As reservas listadas são ordenadas cronologicamente em ordem crescente pelo instante de início do período (`startsAt ASC`).

---

## 8. Validações e Restrições de Entrada
- Rota: `GET /reservas`
- Query Params aceitos (opcionais):
  - `residentId`: string (opcional)
  - `commonAreaId`: string (opcional)
- Parâmetros desconhecidos: descartados pela política de `whitelist: true`.

---

## 9. Requisitos Funcionais (RF) e Tabela de Campos Retornados

| Campo | Tipo | Origem | Retornado? | Justificativa |
|---|---|---|:---:|---|
| `reservationId` | `string` (UUID) | Domínio (`Reservation`) | **Sim** | Identificador único global da reserva. |
| `residentId` | `string` | Domínio (`Reservation`) | **Sim** | Identificação do morador solicitante. |
| `commonAreaId` | `string` | Domínio (`Reservation`) | **Sim** | Identificação do espaço físico reservado. |
| `startsAt` | `string` (ISO 8601 UTC) | Domínio (`period.startsAt`) | **Sim** | Instante de início do uso do espaço. |
| `endsAt` | `string` (ISO 8601 UTC) | Domínio (`period.endsAt`) | **Sim** | Instante de término do uso do espaço. |
| `status` | `string` (`pending`, `confirmed`, `cancelled`) | Domínio (`ReservationStatus`) | **Sim** | Situação atual da reserva. |
| `createdAt` | `string` (ISO 8601 UTC) | Domínio (`Reservation`) | **Sim** | Timestamp de auditoria de criação. |
| `updatedAt` | `string` (ISO 8601 UTC) | Domínio (`Reservation`) | **Sim** | Timestamp de auditoria de alteração. |

---

## 10. Considerações Arquiteturais e Unidades de Trabalho
1. **Unidade 1:** Ampliação aditiva do contrato `IReservationsRepository` com `findAll(): Promise<Reservation[]>`.
2. **Unidade 2:** Implementação do caso de uso `ListReservationsUseCase` na camada de aplicação.
3. **Unidade 3:** Atualização do `InMemoryReservationsRepository` para suportar `findAll()`.
4. **Unidade 4:** Atualização do `TypeOrmReservationsRepository` para suportar `findAll()` com TypeORM.
5. **Unidade 5:** Rota `GET /reservas` no `ReservationsController` utilizando `ReservationHttpMapper`.
6. **Unidade 6:** Suíte completa de testes (Unitários de Service, Controller, Integrado em Memória e Integração PostgreSQL).
7. **Unidade 7:** Coleção REST Client (`.http`) e verificação operacional.

---

## 11. Critérios de Aceite (CA)
- **CA01:** A requisição `GET /reservas` deve retornar status HTTP 200 e um array contendo todas as reservas ativas/cadastradas.
- **CA02:** Cada item retornado deve conter exclusivamente os campos `reservationId`, `residentId`, `commonAreaId`, `startsAt`, `endsAt`, `status`, `createdAt` e `updatedAt`.
- **CA03:** Caso não existam reservas cadastradas, a requisição `GET /reservas` deve retornar HTTP 200 com array vazio `[]`.
- **CA04:** Nenhuma propriedade interna ou sensível injetada na entidade ou no mock deve vazar no JSON de resposta.
- **CA05:** A implementação da listagem não deve alterar, quebrar ou introduzir regressões nas operações existentes de cadastro (`POST /reservas`) ou consulta por ID (`GET /reservas/:id`).

---

## 12. Escopo do Trabalho e Limitações
- Esta especificação é puramente aditiva e não altera esquemas de banco pré-existentes, dispensando novas migrations DDL (a tabela `reservations` já contém todas as colunas).

---

## 13. Tabela de Rastreabilidade

| Requisito / Regra | Fluxo Relacionado | Critério de Aceite | Teste que Comprova |
|---|---|---|---|
| RF01 (Listar coleção) | Fluxo Principal | CA01 | `list-reservations.use-case.spec.ts` / `reservations-integrated.spec.ts` |
| RF02 (Campos públicos) | Fluxo Principal | CA02 | `reservations.controller.spec.ts` (Teste fechado) |
| RN03 / FA01 (Lista vazia) | FA01 | CA03 | `list-reservations.use-case.spec.ts` |
| RN02 (Não vazamento) | Fluxo Principal | CA04 | `reservations.controller.spec.ts` |
| Preservação de contratos | Todos | CA05 | Reexecução da suíte completa de regressão |
