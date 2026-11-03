# Artefato 2 — Decomposição em Unidades de Trabalho

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Documentos de Referência:** `docs/trabalho_6_sistema_condominio.md`, `docs/trabalho_8_sistema_condominio.md`  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Princípios da Decomposição Técnica

A decomposição do caso de uso **UC01 — Solicitar Reserva de Área Comum** foi estruturada respeitando os limites arquiteturais do sistema (*Separation of Concerns*), a modularidade do Monólito em NestJS e a metodologia do projeto pedagógico.

Cada unidade de trabalho constitui uma entrega técnica coesa, delimitada, atribuível e verificável de ponta a ponta dentro de sua respectiva responsabilidade arquitetural, sem divisões artificiais de ciclo TDD (ou seja, cada unidade contempla seu código, tipos e testes de unidade associados à camada).

---

## 2. Tabela de Decomposição das Unidades de Trabalho

| ID | Nome da Atividade Técnica | Objetivo | Escopo e Responsabilidades | Componente / Camada | Regra / Requisito de Origem | Dependências | Critério Geral de Conclusão |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SUB-01** | Modelagem do Domínio e Invariantes da Reserva | Definir o núcleo de domínio do agregado de Reservas, encapsulando regras de negócio e validações temporais. | - Implementar Objeto de Valor `Periodo` (validações de data/hora e cálculo de sobreposição).<br>- Implementar Entidade `Reserva` com identidade, estados (`PENDENTE`, `AGUARDANDO_PAGAMENTO`, etc.), atributos congelados (taxa) e métodos de fábrica.<br>- Definir Enum `ReservaStatus`.<br>- Criar Exceções de Domínio customizadas (`PeriodoInvalidoException`, `ConflitoAgendaException`, `UnidadeInadimplenteException`). | Camada de Domínio (`src/modules/reservas/domain/`) | RN-01 (Não sobreposição)<br>RN-03 (Consistência temporal)<br>RN-04 (Taxa congelada)<br>RN-05 (Ciclo de estados) | Nenhuma (Núcleo autônomo) | Entidades e Value Objects modelados e protegidos por testes unitários puros de domínio, sem dependências de frameworks externos. |
| **SUB-02** | Especificação de Contratos e Portas da Aplicação | Estabelecer as interfaces (portas) que delimitam a camada de aplicação e seus colaboradores externos, além dos comandos e DTOs de dados. | - Definir interfaces das portas secundárias: `IdentidadePort`, `SituacaoFinanceiraPort`, `RegraDeUsoPort`, `ReservaAgendaPort`, `ReservaRepository`, `CobrancaPort`, `Clock`.<br>- Definir Command `SolicitarReservaCommand` e DTO interno de saída.<br>- Definir contratos de parecer financeiro e consulta de regras vigentes. | Camada de Aplicação (`src/modules/reservas/application/ports/`) | RF-01 a RF-06<br>RN-02 (Parecer adimplência)<br>RN-06 (Desacoplamento cobrança) | SUB-01 | Todas as interfaces e contratos de dados tipados formalmente em TypeScript, permitindo injeção de dependência desacoplada. |
| **SUB-03** | Implementação do Serviço de Aplicação (Handler) | Orquestrar o fluxo do UC01 coordenando consultas de portas, invocação do domínio e disparo de persistência/cobrança. | - Implementar `SolicitarReservaHandler`.<br>- Orquestrar validação de vínculo do solicitante via `IdentidadePort`.<br>- Consultar parecer financeiro via `SituacaoFinanceiraPort` e aplicar bloqueio se inadimplente.<br>- Obter política da área e reservas ativas para delegar avaliação de sobreposição ao domínio.<br>- Delegar criação da `Reserva` ao método de domínio.<br>- Acionar `CobrancaPort` caso haja taxa exigível.<br>- Persistir reserva via `ReservaRepository` e retornar resultado. | Camada de Aplicação (`src/modules/reservas/application/handlers/`) | Fluxo Principal do UC01<br>Fluxos Alternativos FA01 a FA06<br>RN-01 a RN-06 | SUB-01<br>SUB-02 | Handler implementado com orquestração completa e testado unitariamente com mocks das portas secundárias. |
| **SUB-04** | Implementação da Fronteira HTTP REST | Expor o caso de uso via API HTTP REST no NestJS com validação de payload e tratamento padronizado de respostas/erros. | - Implementar `ReservasController` mapeando rota `POST /condominios/:condominioId/reservas`.<br>- Criar DTOs de transporte HTTP (`SolicitarReservaRequest`, `ReservaResponse`) com validações via `class-validator`.<br>- Configurar NestJS Pipes e Exception Filters para mapear exceções de domínio/aplicação para códigos de status HTTP corretos (201, 400, 403, 404, 409, 422, 503). | Camada de Apresentação (`src/modules/reservas/presentation/`) | Interface HTTP da especificação do UC01 | SUB-02<br>SUB-03 | Endpoint HTTP funcional, validando requisições, serializando respostas e com tratamento semântico de erros documentado. |
| **SUB-05** | Implementação da Persistência e Adaptadores de Infraestrutura | Prover as implementações em memória e adaptadores concretos das portas para viabilizar execução e testes integrados. | - Implementar `ReservaRepositoryInMemory` como adaptador de `ReservaRepository` e `ReservaAgendaPort`.<br>- Implementar adaptadores simulados (Stubs/Fakes) para `IdentidadeAdapter`, `SituacaoFinanceiraAdapter` e `CobrancaAdapter`.<br>- Configurar o módulo NestJS `ReservasModule` com amarração de providers e injeção de dependência dos tokens de interface. | Camada de Infraestrutura (`src/modules/reservas/infrastructure/`) | Requisitos de persistência durável e integração com contextos colaboradores | SUB-02<br>SUB-03 | Adaptadores funcionais integrados ao módulo NestJS, permitindo bootstrapping do módulo sem quebras de injeção de dependência. |
| **SUB-06** | Implementação da Suíte de Testes Automatizados | Assegurar a cobertura automatizada dos cenários de negócio, regras de integridade e contratos HTTP por meio de testes com Vitest. | - Criar testes unitários para o agregador `Reserva` e `Periodo` (cálculo de conflito, antecedência e invariantes).<br>- Criar testes unitários para o `SolicitarReservaHandler` cobrindo caminho feliz e os fluxos de exceção (inadimplência, falha de cobrança, horário inválido).<br>- Criar testes de integração/e2e para o `ReservasController` verificando códigos de status HTTP, headers e idempotência. | Camada de Testes (`test/modules/reservas/`) | Cenários de Teste e Validação (Seção 23 do Trabalho 6) | SUB-01 a SUB-05 | Suíte de testes automatizada executando com 100% de sucesso via Vitest (`pnpm test`), cobrindo o caminho feliz e todos os fluxos alternativos mapeados. |

---

## 3. Justificativa Técnica da Decomposição em 6 Unidades

A decomposição adotada respeita a métrica de granularidade ótima para engenharia de software corporativa:

1. **Evita a tarefa monolítica indivisível:** Em vez de uma única tarefa "Implementar UC01", cada camada arquitetural possui fronteira nítida.
2. **Independência tecnológica do Domínio (`SUB-01`):** Permite focar nas regras puras de condomínio (não sobreposição, cálculo de antecedência, imunidade da taxa congelada) isoladamente de frameworks.
3. **Contratos explícitos (`SUB-02`):** Garante a arquitetura de portas e adaptadores (*Hexagonal Architecture / Ports & Adapters*), viabilizando que o Módulo de Reservas converse com o Financeiro e com o IAM sem acoplamento direto.
4. **Coordenação de Casos de Uso (`SUB-03`):** Isola a lógica procedural de orquestração do serviço de aplicação, evitando que controladores ou repositórios assumam regras de negócio.
5. **Fronteira e Protocolo HTTP (`SUB-04`):** Trata a comunicação com o cliente externo, validação de payload JSON e conformidade com o padrão REST sem misturar código de transporte com lógica negocial.
6. **Desacoplamento de Infraestrutura (`SUB-05`):** Fornece os adaptadores necessários para o primeiro slice funcionar e ser testado sem impor previamente a complexidade de banco de dados relacional e ORM.
7. **Garantia de Qualidade (`SUB-06`):** Consolida a pirâmide de testes com Vitest, testando desde invariantes do domínio até a resposta HTTP ponta a ponta.

