# Artefato 12 — Relatório de Consistência e Cobertura do Planejamento

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Documentos de Referência:** `docs/trabalho_6_sistema_condominio.md`, `docs/trabalho_8_sistema_condominio.md`  
**Data de Fechamento do Planejamento:** 03 de novembro de 2026  

---

## 1. Sumário Executivo do Planejamento

Este relatório consolida a análise de consistência, completude e rastreabilidade do planejamento técnico de implementação referente ao **primeiro slice arquitetural** do sistema **MyCondo**, centrado no caso de uso **UC01 — Solicitar Reserva de Área Comum**.

O trabalho de decomposição transformou os modelos conceituais, diagramas e regras de negócio definidos nos Trabalhos 1 a 6 em um plano operacional rigorosamente estruturado para o GitHub, estabelecendo a ponte entre a arquitetura corporativa e o desenvolvimento futuro em NestJS 12 e Vitest.

---

## 2. Quantitativo de Artefatos e Estrutura de Decomposição

- **Quantidade Total de Épicos (Issues Principais):** 1 Épico (`[UC01] Solicitar Reserva de Área Comum`)
- **Quantidade Total de Sub-Issues Técnicas:** 6 Sub-Issues delimitadas e atribuídas:
  1. `[SUB-01]` Modelagem do Domínio e Invariantes da Reserva (Camada de Domínio);
  2. `[SUB-02]` Especificação de Contratos e Portas da Aplicação (Camada de Aplicação);
  3. `[SUB-03]` Implementação do Serviço de Aplicação (Handler) (Camada de Aplicação);
  4. `[SUB-04]` Implementação da Fronteira HTTP REST (Camada de Apresentação);
  5. `[SUB-05]` Implementação da Persistência e Adaptadores de Infraestrutura (Camada de Infraestrutura);
  6. `[SUB-06]` Implementação da Suíte de Testes Automatizados (Camada de Testes / Vitest).
- **Taxonomia de Labels Planejada:** 17 labels categorizadas por domínio, tipo, camada, prioridade e prontidão.
- **Configuração de Board Kanban:** 1 GitHub Project configurado estritamente com os 5 estados metodológicos (`Backlog`, `Ready`, `In Progress`, `In Review`, `Done`).

---

## 3. Cobertura dos Requisitos e Fluxos do Caso de Uso

A matriz de rastreabilidade elaborada no Artefato 5 atesta cobertura total dos elementos da documentação:

1. **Requisitos Funcionais Cobertos (100%):**
   - Recepção e validação HTTP de payload (`RF-01` $\rightarrow$ `SUB-04`);
   - Validação de vínculo ativo do solicitante (`RF-02` $\rightarrow$ `SUB-02`, `SUB-03`);
   - Verificação consultiva de adimplência da unidade (`RF-03` $\rightarrow$ `SUB-02`, `SUB-03`);
   - Proteção de concorrência e não sobreposição de horários (`RF-04` $\rightarrow$ `SUB-01`, `SUB-03`);
   - Congelamento imutável da taxa de uso na solicitação (`RF-05` $\rightarrow$ `SUB-01`, `SUB-03`);
   - Desacoplamento e integração com contexto de cobrança (`RF-06` $\rightarrow$ `SUB-02`, `SUB-03`, `SUB-05`);
   - Persistência transacional da reserva (`RF-07` $\rightarrow$ `SUB-02`, `SUB-05`).
2. **Regras de Negócio e Invariantes Cobertas (100%):**
   - Todas as regras (`RN-01` a `RN-06`) foram alocadas exclusivamente no Domínio (`SUB-01`) ou orquestradas na Aplicação (`SUB-03`), sem contaminação do Controller ou de bibliotecas de terceiros.
3. **Fluxos Alternativos e Exceções Cobertos (100%):**
   - Vínculo inativo (403), inadimplência impeditiva (422), área inexistente (404), período inválido (422), sobreposição de agenda (409) e indisponibilidade de cobrança (503) possuem filtros dedicados de resposta.

---

## 4. Análise do Caminho Crítico de Implementação

O fluxo de dependências técnicas (Artefato 6) estabelece o caminho crítico obrigatório:

$$\mathbf{SUB\text{-}01} \longrightarrow \mathbf{SUB\text{-}02} \longrightarrow \mathbf{SUB\text{-}03} \longrightarrow \mathbf{SUB\text{-}04} \text{ / } \mathbf{SUB\text{-}05} \longrightarrow \mathbf{SUB\text{-}06}$$

- **Gargalo Principal:** A finalização do `SolicitarReservaHandler` (`SUB-03`) é o ponto de convergência de onde emergem tanto a exposição externa (HTTP) quanto os adaptadores concretos.
- **Eficiência:** A separação clara entre a fronteira (`SUB-04`) e a infraestrutura (`SUB-05`) viabiliza desenvolvimento paralelo após a estabilização do Handler.

---

## 5. Decisões Técnicas e Hipóteses Sinalizadas para Validação da Equipe

Durante o planejamento, foram identificadas decisões de design que representam **hipóteses técnicas** a serem homologadas pela equipe e pelo professor:

1. **Estratégia de Persistência no Primeiro Slice:**
   - *Decisão Adotada:* Utilização de um repositório em memória atômico (`ReservaRepositoryInMemory`) para viabilizar o ciclo de desenvolvimento rápido e desacoplamento do ORM.
   - *Ponto de Validação:* A equipe precisará confirmar a sprint em que a migração definitiva para PostgreSQL (via TypeORM, Prisma ou Kysely) será inserida no backlog.
2. **Extração da Identidade do Solicitante:**
   - *Hipótese Adotada:* O identificador do morador (`solicitanteId`) será extraído do cabeçalho de autenticação simulado ou do token JWT injetado no request, enquanto o `condominioId` trafega como parâmetro de rota `/condominios/:condominioId/reservas`.
   - *Ponto de Validação:* Alinhar com o Módulo de Gestão de Usuários e Acessos (IAM) se a permissão de reserva é exclusiva do morador titular ou se inquilinos e dependentes também herdam a credencial.
3. **Tratamento de Idempotência:**
   - *Hipótese Adotada:* Reenvios idênticos no mesmo segundo deverão ser protegidos por verificação de chave de idempotência ou por descarte via checagem de sobreposição instantânea.

---

## 6. Mapeamento de Riscos Técnicos e Recomendações para o Início da Implementação

| Risco Técnico Identificado | Impacto Potencial | Probabilidade | Ação Preventiva / Mitigação Recomendada |
| :--- | :---: | :---: | :--- |
| **Vazamento de regras para o Controller** | Alto | Média | Manter o Controller estritamente como tradutor de protocolo HTTP. Não permitir validações de horário ou lógica de permissão dentro de decorators ou métodos do controller. |
| **Condição de corrida na reserva simultânea** | Alto | Baixa (no slice inicial) | Na transição para o banco PostgreSQL, implementar restrições transacionais com `EXCLUDE USING gist` ou bloqueios pessimistas (`SELECT FOR UPDATE`) para impedir confirmação dupla em milissegundos idênticos. |
| **Acoplamento com o Módulo Financeiro** | Médio | Média | Garantir que a `SituacaoFinanceiraPort` e a `CobrancaPort` trafeguem apenas tipos de dados primitivos/DTOs, sem importar entidades do contexto financeiro para dentro do módulo de reservas. |
| **Quebra de compatibilidade ESM / TypeScript** | Médio | Baixa | Manter a execução estrita com pnpm e scripts oficiais do NestJS 12 e Vitest configurados no Trabalho 8. |

---

## 7. Parecer Final

O planejamento técnico encontra-se **íntegro, robusto, consistente e 100% documentado**. A equipe dispõe de todos os subsídios necessários para transitar para o repositório GitHub, configurar as labels, abrir as issues e dar início ordenado à implementação técnica a partir de `[SUB-01]`.

