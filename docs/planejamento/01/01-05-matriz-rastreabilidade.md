# Artefato 5 — Matriz de Rastreabilidade

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Documentos de Referência:** `docs/trabalho_6_sistema_condominio.md`, `docs/trabalho_8_sistema_condominio.md`, `docs/sistema_condominio_regras_agregado.md`  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Finalidade

A Matriz de Rastreabilidade assegura a correspondência biunívoca entre os elementos conceituais da especificação do caso de uso **UC01** (requisitos funcionais, regras de negócio, fluxos de execução e invariantes) e as unidades técnicas de trabalho planejadas no GitHub (**Sub-Issues**), garantindo cobertura integral sem tarefas órfãs ou requisitos desatendidos.

---

## 2. Matriz de Rastreabilidade Requisitos $\times$ Sub-Issues

| Requisito / Regra / Fluxo de Origem | ID Sub-Issue | Atividade Técnica Associada | Critério de Aceite Vinculado | Comportamento a ser Verificado Futuramente |
| :--- | :---: | :--- | :--- | :--- |
| **RF-01** (Recepção e validação da solicitação HTTP) | `SUB-04` | Implementação da Fronteira HTTP REST | Validação de payload com `class-validator` e resposta 201 | Envio de requisição JSON na rota `POST /condominios/:id/reservas` com retorno correto de status HTTP. |
| **RF-02** (Validação de vínculo do morador com unidade) | `SUB-02`<br>`SUB-03` | Definição de Portas e Implementação do Handler | Verificação via `IdentidadePort` com aborto em caso nulo | Morador sem vínculo ativo com o condomínio/unidade tem a solicitação rejeitada com HTTP 403 Forbidden. |
| **RF-03** / **RN-02** (Verificação de adimplência financeira) | `SUB-02`<br>`SUB-03` | Definição da `SituacaoFinanceiraPort` e checagem no Handler | Lançamento de `UnidadeInadimplenteException` se devedor | Unidade com débitos pendentes é impedida de reservar área que exige regularidade, retornando HTTP 422. |
| **RF-04** / **RN-01** (Não sobreposição de agenda) | `SUB-01`<br>`SUB-03` | Modelagem do `Periodo` e verificação no Domínio/Handler | `periodo.sobrepoe()` acusa conflito lançando exceção | Tentativa de reserva concorrente para mesmo espaço e intervalo temporal é barrada com HTTP 409 Conflict. |
| **RF-05** / **RN-04** (Congelamento da taxa de uso na reserva) | `SUB-01`<br>`SUB-03` | Atributo imutável na `Reserva` alimentado pelo Handler | `taxaUsoCongelada` preservada independentemente de alterações | A reserva salva armazena o valor histórico exato da taxa no momento da solicitação. |
| **RF-06** / **RN-06** (Integração com contexto de Cobrança) | `SUB-02`<br>`SUB-03`<br>`SUB-05` | Definição da `CobrancaPort`, invocação e adaptador | Chamada a `cobrancaPort.criarCobrancaParaReserva` | Reserva sujeita a taxa gera ordem no Módulo Financeiro e assume estado inicial `AGUARDANDO_PAGAMENTO`. |
| **RF-07** (Persistência atômica da reserva) | `SUB-02`<br>`SUB-05` | Definição de `ReservaRepository` e adaptador em memória | Persistência atômica e recuperação via `salvar` | A reserva criada sobrevive na memória/banco de dados e pode ser consultada por seu identificador. |
| **RN-03** (Consistência temporal do período) | `SUB-01` | Objeto de Valor `Periodo` no Domínio | `inicio < fim` e antecedência mínima respeitada | Datas inválidas ou invertidas lançam `PeriodoInvalidoException` gerando HTTP 422. |
| **RN-05** (Ciclo de vida e estados da reserva) | `SUB-01` | Enum `ReservaStatus` e fábrica na Entidade | Estado inicial `PENDENTE` ou `AGUARDANDO_PAGAMENTO` | Instância criada assume estado condizente e impede transições arbitrárias sem comportamento do agregado. |
| **Fluxo Principal** (Solicitação bem-sucedida) | `SUB-03`<br>`SUB-04` | Orquestração pelo Handler e Controller | Sucesso ponta a ponta com retorno 201 Created | Requisição válida cria a reserva no repositório e devolve o DTO completo com identificador único gerado. |
| **FA01** (Vínculo inexistente) | `SUB-03`<br>`SUB-04` | Verificação do vínculo na porta e filtro de exceção | Aborto com código HTTP 403 Forbidden | Acesso negado quando o solicitante não possui relacionamento ativo com o condomínio. |
| **FA02** (Inadimplência impeditiva) | `SUB-03`<br>`SUB-04` | Interrupção por parecer inadimplente | Aborto com código HTTP 422 Unprocessable Entity | Recusa negocial clara indicando pendência financeira da unidade. |
| **FA03** (Área inexistente ou sem regra) | `SUB-03`<br>`SUB-04` | Consulta de regra na porta e filtro de exceção | Aborto com código HTTP 404 Not Found | Mensagem de erro apropriada caso a área solicitada não seja localizada. |
| **FA04** (Período inválido ou fora de política) | `SUB-01`<br>`SUB-04` | Validação no `Periodo` e tradução HTTP | Aborto com código HTTP 422 Unprocessable Entity | Rejeição semântica para intervalos no passado ou com formatação ilógica. |
| **FA05** (Conflito de agenda / Sobreposição) | `SUB-01`<br>`SUB-03`<br>`SUB-04` | Algoritmo de interseção e lançamento de conflito | Aborto com código HTTP 409 Conflict | Resposta clara informando que o horário desejado já se encontra reservado. |
| **FA06** (Falha de criação de cobrança) | `SUB-03`<br>`SUB-04` | Tratamento de erro na porta de cobrança | Aborto transacional sem persistência órfã | Falha externa resulta em HTTP 503 e não gera reserva sem cobrança. |
| **Garantia de Qualidade e Invariantes** | `SUB-06` | Suíte de testes automatizados com Vitest | 100% de sucesso na execução de `pnpm test` | Todos os cenários descritos acima são verificados automaticamente a cada alteração no código. |

---

## 3. Análise de Cobertura e Consistência

1. **Cobertura de Requisitos:**
   - 100% dos requisitos funcionais (RF-01 a RF-07) possuem pelo menos uma sub-issue técnica responsável.
   - 100% das regras de negócio (RN-01 a RN-06) estão expressamente vinculadas ao núcleo de domínio ou à camada de aplicação.
   - Todos os fluxos alternativos e de exceção (FA01 a FA06) possuem tratamento específico atribuído.
2. **Ausência de Tarefas Órfãs:**
   - Todas as 6 Sub-Issues planejadas possuem justificativa direta fundamentada na especificação do caso de uso e na arquitetura em camadas do projeto. Nenhuma tarefa foi criada sem origem formal documentada.
3. **Ausência de Sobreposições Artificiais:**
   - Não há tarefas redundantes ou separações artificiais de fases de TDD (ex.: não existe uma tarefa exclusiva para "escrever teste vermelho" e outra para "escrever código verde"). Cada unidade técnica entrega sua camada completa com seus testes correspondentes.

