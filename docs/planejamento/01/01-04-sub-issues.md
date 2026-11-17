# Artefato 4 — Especificação Completa das Sub-Issues

> **Instrução:** Este documento reúne as especificações técnicas completas de cada uma das 6 Sub-Issues do caso de uso **UC01**, formatadas em blocos Markdown prontos para cópia e colagem direta no GitHub.

---

## Sub-Issue 01

```markdown
# [SUB-01] Modelagem do Domínio e Invariantes da Reserva

### 1. Objetivo
Modelar e implementar o núcleo de domínio do módulo de Reservas, encapsulando as entidades de domínio, objetos de valor (Value Objects), enums de ciclo de vida e exceções de negócio, garantindo que as regras de integridade do MyCondo sejam protegidas independentemente de frameworks ou infraestrutura.

### 2. Descrição Detalhada
Desenvolver em TypeScript puro (sem dependências do NestJS ou bibliotecas externas):
- O Objeto de Valor `Periodo`: encapsulando `inicio` e `fim` em UTC, garantindo que `inicio < fim`, calculando a duração e provendo o método `sobrepoe(outro: Periodo): boolean` baseado no teste de interseção de intervalos abertos/semiabertos: $\max(inicio_1, inicio_2) < \min(fim_1, fim_2)$.
- O Enum de Estado `ReservaStatus`: contendo os estados mínimos exigidos pelo primeiro slice: `PENDENTE`, `AGUARDANDO_PAGAMENTO`, `CONFIRMADA`, `RECUSADA`.
- A Entidade Raiz `Reserva`: contendo identificador único (`id`: UUID), `condominioId`, `areaId`, `unidadeId`, `solicitanteId`, `periodo`: `Periodo`, `status`: `ReservaStatus`, `taxaUsoCongelada`: `number | null`, `criadoEm`: `Date`.
- Métodos de fábrica / comportamento na entidade `Reserva`:
  - `static criar(params: CriarReservaParams): Reserva`
  - Métodos de validação de estado e transições seguras.
- Exceções de Domínio customizadas:
  - `PeriodoInvalidoException`
  - `ConflitoAgendaException`
  - `UnidadeInadimplenteException`
  - `TransicaoEstadoInvalidaException`

### 3. Origem no Caso de Uso
- **Regras de Negócio:** RN-01 (Não sobreposição de agenda), RN-03 (Consistência temporal do período), RN-04 (Congelamento da taxa de uso) e RN-05 (Ciclo de estados e invariantes).
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seções 11, 12 e 14.

### 4. Escopo e Responsabilidades
- **Localização:** `src/modules/reservas/domain/`
- **Fronteira:** Exclusivamente classes, tipos e testes unitários de domínio puro.
- **Não inclui:** Anotações de ORM, decorators de validação HTTP (`class-validator`), injeção de dependência do NestJS ou persistência em banco.

### 5. Critérios de Aceite
- [ ] `Periodo` lança `PeriodoInvalidoException` se a data de início for posterior ou igual à data de término.
- [ ] O método `periodo.sobrepoe(outro)` retorna `true` para intervalos concorrentes e `false` para períodos estritamente disjuntos.
- [ ] A fábrica `Reserva.criar` instancia a reserva em `PENDENTE` quando não houver taxa de uso ou em `AGUARDANDO_PAGAMENTO` quando a taxa for superior a zero.
- [ ] O valor de `taxaUsoCongelada` é gravado imutavelmente na criação da instância da `Reserva`.
- [ ] Tentativas de transição de estado proibidas disparam `TransicaoEstadoInvalidaException`.
- [ ] 100% de cobertura de testes unitários no Vitest para todas as classes do domínio.

### 6. Dependências Técnicas
- **Pré-requisitos:** Nenhum (início autônomo do domínio).
- **Bloqueia:** SUB-02, SUB-03, SUB-05, SUB-06.

### 7. Labels Sugeridas
`domain:reservas`, `layer:domain`, `type:feature`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Ready` (Atende integralmente à Definition of Ready).

### 10. Evidências Esperadas
- Código-fonte TypeScript em `src/modules/reservas/domain/`.
- Suíte de testes unitários puros em `test/modules/reservas/domain/reserva.spec.ts` e `periodo.spec.ts` executando com sucesso no Vitest.
```

---

## Sub-Issue 02

```markdown
# [SUB-02] Especificação de Contratos e Portas da Aplicação

### 1. Objetivo
Definir os contratos de interface (Portas de Saída e Entrada) e os objetos de transferência interna (Commands e DTOs) da camada de aplicação do módulo de Reservas, viabilizando a integração desacoplada com contextos colaboradores (IAM, Financeiro e Repositórios).

### 2. Descrição Detalhada
Especificar em TypeScript as interfaces formais da arquitetura hexagonal/em camadas:
- **Portas Secundárias (Saída / Colaborações):**
  - `IdentidadePort`: método `obterVinculoAtivo(atorId: string, condominioId: string): Promise<VinculoInfo | null>`.
  - `SituacaoFinanceiraPort`: método `consultarAdimplencia(unidadeId: string, referencia: Date): Promise<ParecerFinanceiro>`.
  - `RegraDeUsoPort`: método `obterRegraVigente(areaId: string, instante: Date): Promise<RegraDeUso | null>`.
  - `ReservaAgendaPort`: método `listarReservasAtivas(areaId: string, periodo: Periodo): Promise<Reserva[]>`.
  - `ReservaRepository`: métodos `salvar(reserva: Reserva): Promise<void>` e `buscarPorId(id: string): Promise<Reserva | null>`.
  - `CobrancaPort`: método `criarCobrancaParaReserva(dados: DadosCobrancaReserva): Promise<CobrancaResultado>`.
  - `Clock`: método `agora(): Date`.
- **Contratos de Transporte Interno da Aplicação:**
  - `SolicitarReservaCommand`: contendo `condominioId`, `areaId`, `solicitanteId`, `unidadeId`, `inicio`, `fim`.
  - `SolicitarReservaOutput`: DTO de retorno contendo dados essenciais da reserva recém-criada.
  - Tipos e interfaces de apoio: `VinculoInfo`, `ParecerFinanceiro` (com flags `adimplente: boolean`, `dataParecer: Date`), `RegraDeUso` (com `exigeAdimplencia: boolean`, `taxaUso: number`, `antecedenciaMinimaHoras: number`).

### 3. Origem no Caso de Uso
- **Regras de Negócio:** RN-02 (Validação de Adimplência), RN-04 (Taxa congelada), RN-06 (Desacoplamento de Cobrança).
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seções 13, 15 e 17.

### 4. Escopo e Responsabilidades
- **Localização:** `src/modules/reservas/application/ports/` e `src/modules/reservas/application/dtos/`
- **Fronteira:** Exclusivamente interfaces, types e DTOs da camada de aplicação.
- **Não inclui:** Implementações concretas de repositórios, chamadas HTTP reais ou dependências externas.

### 5. Critérios de Aceite
- [ ] Todas as 7 portas secundárias (`IdentidadePort`, `SituacaoFinanceiraPort`, `RegraDeUsoPort`, `ReservaAgendaPort`, `ReservaRepository`, `CobrancaPort`, `Clock`) definidas e tipadas.
- [ ] Command `SolicitarReservaCommand` definido com tipos imutáveis (`readonly`).
- [ ] Tokens de injeção de dependência (`Symbol` ou strings constantes) definidos para viabilizar injeção no container IoC do NestJS.
- [ ] Ausência de anotações ou classes concretas de banco de dados nos contratos.

### 6. Dependências Técnicas
- **Pré-requisitos:** SUB-01 (Modelagem do Domínio e Invariantes da Reserva).
- **Bloqueia:** SUB-03, SUB-04, SUB-05.

### 7. Labels Sugeridas
`domain:reservas`, `layer:application`, `type:feature`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Backlog` (Aguardando conclusão de SUB-01).

### 10. Evidências Esperadas
- Arquivos de interfaces em `src/modules/reservas/application/ports/`.
- Compilação limpa no TypeScript (`pnpm build`) sem erros de tipo.
```

---

## Sub-Issue 03

```markdown
# [SUB-03] Implementação do Serviço de Aplicação (Handler)

### 1. Objetivo
Implementar o serviço de aplicação (`SolicitarReservaHandler`) responsável por coordenar a execução ponta a ponta do caso de uso UC01, orquestrando as consultas às portas, as validações de domínio e os disparos de persistência e cobrança.

### 2. Descrição Detalhada
Desenvolver a classe `SolicitarReservaHandler`:
- Receber as portas secundárias injetadas via construtor utilizando os tokens de injeção definidos na SUB-02.
- Implementar o método `executar(command: SolicitarReservaCommand): Promise<SolicitarReservaOutput>` seguindo a ordenação obrigatória da arquitetura:
  1. Validar vínculo do solicitante via `identidadePort.obterVinculoAtivo(command.solicitanteId, command.condominioId)`. Lançar exceção de autorização caso nulo.
  2. Consultar parecer financeiro da unidade via `situacaoFinanceiraPort.consultarAdimplencia(...)`.
  3. Obter regra vigente da área via `regraDeUsoPort.obterRegraVigente(...)`. Caso não exista regra ou área, lançar exceção de recurso inexistente.
  4. Caso a regra exija adimplência e o parecer acuse inadimplência, abortar o fluxo lançando `UnidadeInadimplenteException`.
  5. Obter reservas ativas da mesma área no período via `reservaAgendaPort.listarReservasAtivas(...)`.
  6. Instanciar o Value Object `Periodo` a partir das datas do comando.
  7. Invocar a verificação de sobreposição: se qualquer reserva ativa tiver período concorrente, lançar `ConflitoAgendaException`.
  8. Criar a instância de `Reserva` via `Reserva.criar(...)`, congelando o valor da taxa prevista na regra de uso.
  9. Se a reserva for tarifada (`taxaUso > 0`), invocar `cobrancaPort.criarCobrancaParaReserva(...)`.
  10. Persistir a reserva através de `reservaRepository.salvar(reserva)`.
  11. Mapear a entidade para `SolicitarReservaOutput` e retornar ao chamador.

### 3. Origem no Caso de Uso
- **Fluxos:** Fluxo Principal, FA01 (Vínculo inativo), FA02 (Inadimplência), FA03 (Área inexistente), FA04 (Período inválido), FA05 (Conflito de agenda), FA06 (Falha na cobrança).
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seções 6, 13 e 21 (Diagrama de Sequência).

### 4. Escopo e Responsabilidades
- **Localização:** `src/modules/reservas/application/handlers/solicitar-reserva.handler.ts`
- **Fronteira:** Coordenação do caso de uso. Não toma decisões negociais próprias (delega ao domínio) e não trata detalhes de HTTP ou SQL.
- **Não inclui:** Controllers NestJS, queries SQL diretas ou renderização de telas.

### 5. Critérios de Aceite
- [ ] O Handler coordena a sequência correta de chamadas sem inverter a ordem lógica de verificação.
- [ ] Se o morador não tiver vínculo ativo, a execução é interrompida antes de consultar a agenda.
- [ ] Se a unidade estiver inadimplente e a regra exigir adimplência, é lançada `UnidadeInadimplenteException` sem criar cobrança ou persistir.
- [ ] Se houver conflito de horário com reserva ativa, é lançada `ConflitoAgendaException`.
- [ ] A taxa é repassada para congelamento na reserva conforme o valor retornado pela regra de uso.
- [ ] Para reservas com taxa, a cobrança é solicitada antes da persistência final da reserva.
- [ ] Testes unitários do Handler cobrindo 100% dos caminhos felizes e de exceção com uso de Stubs/Mocks para todas as portas.

### 6. Dependências Técnicas
- **Pré-requisitos:** SUB-01 (Domínio) e SUB-02 (Portas da Aplicação).
- **Bloqueia:** SUB-04, SUB-05, SUB-06.

### 7. Labels Sugeridas
`domain:reservas`, `layer:application`, `type:feature`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Backlog` (Aguardando conclusão de SUB-01 e SUB-02).

### 10. Evidências Esperadas
- Código do Handler em `src/modules/reservas/application/handlers/`.
- Suíte de testes unitários do Handler em `test/modules/reservas/application/solicitar-reserva.handler.spec.ts` validando todas as ramificações de fluxo.
```

---

## Sub-Issue 04

```markdown
# [SUB-04] Implementação da Fronteira HTTP REST

### 1. Objetivo
Implementar o controlador HTTP REST (`ReservasController`) e os objetos de transporte HTTP do NestJS, validando o payload de entrada, tratando a autenticação do solicitante e mapeando adequadamente as exceções de aplicação e domínio para os códigos de status HTTP previstos na especificação.

### 2. Descrição Detalhada
Desenvolver na camada de apresentação:
- **DTOs de Entrada e Saída:**
  - `SolicitarReservaRequest`: DTO contendo `areaId`: string (UUID), `inicio`: string (ISO 8601 UTC) e `fim`: string (ISO 8601 UTC), decorado com anotações de validação (`@IsUUID`, `@IsISO8601`, `@IsNotEmpty`).
  - `ReservaResponse`: DTO serializado contendo `id`, `condominioId`, `areaId`, `unidadeId`, `inicio`, `fim`, `status`, `taxaUsoCongelada`, `criadoEm`.
- **Controller NestJS:**
  - `ReservasController`: decorado com `@Controller('condominios/:condominioId/reservas')`.
  - Método `@Post()` implementando a rota de criação da reserva, extraindo o `condominioId` dos parâmetros de rota (`@Param`), o corpo da requisição (`@Body`) e a identidade do usuário do contexto autenticado / headers (`@Headers` ou decorator customizado de usuário).
  - Montagem do `SolicitarReservaCommand` e delegação ao `SolicitarReservaHandler`.
- **Tratamento de Exceções e Respostas HTTP:**
  - Configuração do `ValidationPipe` global/local com `whitelist: true` e `forbidNonWhitelisted: true`.
  - Implementação de um Exception Filter dedicado (`ReservasExceptionFilter`) mapeando:
    - `ConflitoAgendaException` $\rightarrow$ `HTTP 409 Conflict`
    - `UnidadeInadimplenteException` $\rightarrow$ `HTTP 422 Unprocessable Entity`
    - `PeriodoInvalidoException` $\rightarrow$ `HTTP 422 Unprocessable Entity`
    - Recusa de vínculo / autorização $\rightarrow$ `HTTP 403 Forbidden`
    - Área não encontrada $\rightarrow$ `HTTP 404 Not Found`
    - Sucesso $\rightarrow$ `HTTP 201 Created`

### 3. Origem no Caso de Uso
- **Interface:** Planejamento da Interface HTTP e Tabela de Resultados e Falhas.
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seções 16 e 20.

### 4. Escopo e Responsabilidades
- **Localização:** `src/modules/reservas/presentation/`
- **Fronteira:** Tradução HTTP, validação de tipos de transporte e formatação de resposta.
- **Não inclui:** Regras de negócio de reservas ou cálculo de adimplência.

### 5. Critérios de Aceite
- [ ] Rota `POST /condominios/:condominioId/reservas` acessível e processando requisições JSON.
- [ ] Payload com dados inválidos (ex.: UUID incorreto, datas fora do padrão ISO 8601) retorna imediatamente `HTTP 400 Bad Request`.
- [ ] Resposta de sucesso retorna código `HTTP 201 Created` com payload contendo os campos de `ReservaResponse`.
- [ ] Exceções negociais são capturadas e convertidas nos códigos HTTP 403, 404, 409 e 422 com mensagens explicativas no formato JSON padronizado.

### 6. Dependências Técnicas
- **Pré-requisitos:** SUB-02 (Contratos e DTOs) e SUB-03 (Handler da Aplicação).
- **Bloqueia:** SUB-06.

### 7. Labels Sugeridas
`domain:reservas`, `layer:presentation`, `type:feature`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Backlog` (Aguardando conclusão de SUB-02 e SUB-03).

### 10. Evidências Esperadas
- Controlador implementado em `src/modules/reservas/presentation/reservas.controller.ts`.
- Exception Filter em `src/modules/reservas/presentation/reservas-exception.filter.ts`.
- Testes unitários do controller garantindo despacho correto do comando.
```

---

## Sub-Issue 05

```markdown
# [SUB-05] Implementação da Persistência e Adaptadores de Infraestrutura

### 1. Objetivo
Implementar os adaptadores de infraestrutura para persistência e simulação das portas externas, viabilizando o funcionamento autônomo do primeiro slice e a montagem do módulo NestJS com injeção de dependências desacoplada.

### 2. Descrição Detalhada
Desenvolver os adaptadores concretos que implementam as portas definidas na SUB-02:
- `ReservaRepositoryInMemory`: adaptador que implementa conjuntamente `ReservaRepository` e `ReservaAgendaPort`, utilizando uma coleção em memória para armazenar instâncias de `Reserva` e consultar reservas ativas por área e período de forma rápida e atômica.
- Adaptadores de Simulação (Stubs/Fakes de contextos externos):
  - `IdentidadeAdapterFake`: implementa `IdentidadePort`, simulando cenários de vínculo ativo e inexistente para testes.
  - `SituacaoFinanceiraAdapterFake`: implementa `SituacaoFinanceiraPort`, simulando pareceres de adimplência e inadimplência configuráveis.
  - `RegraDeUsoAdapterFake`: implementa `RegraDeUsoPort`, retornando políticas de uso pré-configuradas (com ou sem taxa de uso e antecedências mínimas).
  - `CobrancaAdapterFake`: implementa `CobrancaPort`, simulando a recepção da ordem de cobrança e retornando identificador de transação.
  - `SystemClock`: implementa `Clock` retornando a data/hora real do sistema (`new Date()`).
- Módulo NestJS:
  - Criar `ReservasModule` registrando o `ReservasController` e provendo a amarração dos tokens de porta para suas respectivas classes concretas via `useClass` ou `useValue`.

### 3. Origem no Caso de Uso
- **Necessidade:** Planejamento da persistência e portas de integração externa.
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seções 15, 18 e 19.

### 4. Escopo e Responsabilidades
- **Localização:** `src/modules/reservas/infrastructure/`
- **Fronteira:** Adaptadores de banco em memória, mocks de integração e configuração do módulo NestJS.
- **Não inclui:** Migrations complexas de PostgreSQL ou dependência de banco em nuvem neste slice inicial.

### 5. Critérios de Aceite
- [ ] `ReservaRepositoryInMemory` persiste e recupera reservas preservando todas as suas propriedades e estados.
- [ ] O método `listarReservasAtivas` do repositório em memória filtra corretamente por área e desconsidera reservas com status `RECUSADA` ou `CANCELADA`.
- [ ] Todos os adaptadores implementam rigorosamente as interfaces tipadas de suas respectivas portas.
- [ ] O `ReservasModule` inicializa no container do NestJS sem erros de injeção de dependência.

### 6. Dependências Técnicas
- **Pré-requisitos:** SUB-02 (Contratos e Portas) e SUB-03 (Handler da Aplicação).
- **Bloqueia:** SUB-06.

### 7. Labels Sugeridas
`domain:reservas`, `layer:infrastructure`, `type:feature`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Backlog` (Aguardando conclusão de SUB-02 e SUB-03).

### 10. Evidências Esperadas
- Implementação dos adaptadores em `src/modules/reservas/infrastructure/`.
- Testes unitários do repositório em memória em `test/modules/reservas/infrastructure/reserva-repository-in-memory.spec.ts`.
- Módulo `ReservasModule` devidamente exportado e integrado à raiz do projeto.
```

---

## Sub-Issue 06

```markdown
# [SUB-06] Implementação da Suíte de Testes Automatizados (Vitest)

### 1. Objetivo
Desenvolver uma suíte abrangente de testes automatizados unitários, de integração e ponta a ponta (E2E) utilizando Vitest, assegurando a verificação rigorosa de todos os critérios de aceite, fluxos alternativos e invariantes de negócio do UC01.

### 2. Descrição Detalhada
Elaborar os testes automatizados com base nos 11 cenários de teste mapeados na Seção 23 do Trabalho 6:
- **Testes Unitários de Domínio:**
  - Criação de reserva para área sem taxa (status inicial `PENDENTE`).
  - Criação de reserva para área tarifada (status inicial `AGUARDANDO_PAGAMENTO` e taxa congelada).
  - Validação do `Periodo` (recusa de datas retroativas, início $\ge$ fim).
  - Cálculo de conflito de agenda (sobreposição parcial, total, períodos contíguos válidos).
- **Testes Unitários de Aplicação (Handler):**
  - Execução bem-sucedida do fluxo de solicitação com geração de cobrança.
  - Aborto por inexistência de vínculo do morador (`HTTP 403`).
  - Aborto por inadimplência da unidade (`HTTP 422`).
  - Aborto por área inexistente (`HTTP 404`).
  - Aborto por sobreposição de reserva detectada na agenda (`HTTP 409`).
  - Tratamento de falha na porta de cobrança (`HTTP 503`).
- **Testes de Integração / E2E de Controlador:**
  - Envio de requisições HTTP para a rota `POST /condominios/:condominioId/reservas` e verificação dos códigos de status e schemas de resposta.
  - Validação de formato incorreto no JSON de entrada (`HTTP 400`).

### 3. Origem no Caso de Uso
- **Validação:** Planejamento de Validação e Cenários de Teste.
- **Referência:** `docs/trabalho_6_sistema_condominio.md`, Seção 23 e `docs/trabalho_8_sistema_condominio.md`, Seção 3.

### 4. Escopo e Responsabilidades
- **Localização:** `test/modules/reservas/`
- **Fronteira:** Suíte completa de testes com Vitest cobrindo todas as camadas.
- **Não inclui:** Testes de carga ou testes com serviços externos em produção.

### 5. Critérios de Aceite
- [ ] 100% dos testes unitários e de integração executando e passando no comando `pnpm test`.
- [ ] Todos os 11 cenários de teste do blueprint contemplados por pelo menos um teste automatizado.
- [ ] Nenhum teste dependente de recursos externos de rede ou serviços de terceiros (totalmente determinísticos e isolados).
- [ ] Relatório de cobertura indicando cobertura de linhas e branches superior a 90% no módulo de reservas.

### 6. Dependências Técnicas
- **Pré-requisitos:** SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 (todas as unidades de implementação concluídas).
- **Bloqueia:** Fechamento do Épico principal `[UC01]`.

### 7. Labels Sugeridas
`domain:reservas`, `layer:test`, `type:test`, `priority:must-have`

### 8. Responsável Designado
Vinicius Martins Nunes

### 9. Estado Inicial no Board
`Backlog` (Aguardando conclusão das unidades anteriores).

### 10. Evidências Esperadas
- Arquivos de teste no diretório `test/modules/reservas/`.
- Log de execução do comando `pnpm test` exibindo todos os testes verdes (*passing*).
```

