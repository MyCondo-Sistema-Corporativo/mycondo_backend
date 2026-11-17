# Artefato 8 — Planejamento do GitHub Project (Board Kanban)

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Organização GitHub:** [MyCondo - Sistema Corporativo](https://github.com/MyCondo-Sistema-Corporativo)  
**Projeto Alvo:** Project Board do MyCondo Backend  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Estrutura do GitHub Project e Padronização dos Estados

O acompanhamento visual e a governança do desenvolvimento do **MyCondo** utilizarão a ferramenta **GitHub Projects** (versão baseada em tabelas e quadros Kanban).

Em estrita conformidade com a metodologia do curso de Sistemas Corporativos, o campo customizado **Status** do projeto deverá ser configurado **exclusivamente com os 5 estados padronizados**:

```text
+-----------+       +---------+       +---------------+       +-------------+       +--------+
|  Backlog  | ----> |  Ready  | ----> |  In Progress  | ----> |  In Review  | ----> |  Done  |
+-----------+       +---------+       +---------------+       +-------------+       +--------+
```

> **Aviso de Conformidade:** É expressamente vedada a utilização de nomenclaturas divergentes como "Todo", "No Status", "In QA" ou "Completed". O board deve conter exatamente as 5 colunas acima.

---

## 2. Definição das Colunas e Políticas de Transição

### 1. `Backlog`
- **Significado:** Atividades técnicas planejadas, especificadas e documentadas, porém que ainda possuem pendências de pré-requisitos técnicos ou aguardam o momento oportuno de priorização no ciclo de desenvolvimento.
- **Regra de Entrada:** Criação da Sub-Issue no GitHub.
- **Regra de Saída:** Quando todos os pré-requisitos técnicos forem cumpridos e os critérios de aceitação estiverem prontos para execução.

### 2. `Ready`
- **Significado:** Atividade que atende integralmente à *Definition of Ready (DoR)*. Encontra-se completamente desbloqueada de dependências, possui critérios de aceite verificáveis e está apta para que o desenvolvedor inicie a codificação imediatamente.
- **Regra de Entrada:** Sub-Issue com dependências concluídas e escopo estabilizado.
- **Regra de Saída:** Atribuição do desenvolvedor e início formal do desenvolvimento (criação da branch de trabalho).

### 3. `In Progress`
- **Significado:** Atividade em desenvolvimento ativo pelo responsável designado.
- **Regra de Entrada:** O desenvolvedor move o card ao iniciar o trabalho em uma branch específica (ex.: `feature/sub-01-dominio-reserva`).
- **Regra de Saída:** Código implementado, testes unitários da camada passando localmente e abertura de um Pull Request (PR) com apontamento para a Sub-Issue.

### 4. `In Review`
- **Significado:** O código foi submetido via Pull Request e está sob avaliação técnica (Code Review / Revisão por Pares), verificação de conformidade arquitetural e execução da suíte de integração contínua (CI).
- **Regra de Entrada:** Pull Request aberto e associado à issue.
- **Regra de Saída:** Aprovação formal da revisão sem apontamentos pendentes e pipelines de teste verdes.

### 5. `Done`
- **Significado:** Atividade finalizada que atende à *Definition of Done (DoD)*.
- **Regra de Entrada:** Pull Request aprovado e integrado à branch principal (`main`) via Merge, com fechamento automático da Sub-Issue correspondente.
- **Regra de Saída:** Estado terminal do fluxo de entrega.

---

## 3. Tabela de Distribuição Inicial das Issues no Board

Por estarmos rigorosamente na **fase de planejamento técnico de implementação** (sem início antecipado de código nesta etapa), todas as tarefas iniciam alocadas entre `Backlog` e `Ready`, refletindo a maturidade de cada dependência técnica:

| Tipo | Identificador | Título da Atividade | Status Inicial Recomendado | Justificativa do Estado Inicial |
| :---: | :---: | :--- | :---: | :--- |
| **Epic** | `[UC01]` | Solicitar Reserva de Área Comum | `Backlog` | O épico guarda o macro-escopo e transitará para *In Progress* quando a primeira Sub-Issue for iniciada, concluindo-se (*Done*) quando todas forem finalizadas. |
| **Sub-Issue** | `[SUB-01]` | Modelagem do Domínio e Invariantes da Reserva | `Ready` | Não possui pré-requisitos técnicos; especificação de regras, Value Objects e invariantes está 100% pronta para início imediato. |
| **Sub-Issue** | `[SUB-02]` | Especificação de Contratos e Portas da Aplicação | `Backlog` | Depende da exportação dos tipos e entidades modeladas em `SUB-01`. Transitará para *Ready* assim que `SUB-01` for concluída. |
| **Sub-Issue** | `[SUB-03]` | Implementação do Serviço de Aplicação (Handler) | `Backlog` | Depende diretamente da conclusão de `SUB-01` e `SUB-02`. |
| **Sub-Issue** | `[SUB-04]` | Implementação da Fronteira HTTP REST | `Backlog` | Depende da estabilização do Handler (`SUB-03`) e das portas (`SUB-02`). |
| **Sub-Issue** | `[SUB-05]` | Implementação da Persistência e Adaptadores | `Backlog` | Depende dos contratos de portas (`SUB-02`) e entidades (`SUB-01`). |
| **Sub-Issue** | `[SUB-06]` | Implementação da Suíte de Testes Automatizados | `Backlog` | Atividade integradora final; depende da implementação de todas as unidades anteriores (`SUB-01` a `SUB-05`). |

---

## 4. Campos Customizados e Configurações Recomendadas no Board

Para enriquecer a rastreabilidade e governança no GitHub Projects, recomenda-se configurar os seguintes campos adicionais:

1. **Title:** Nome da Issue / Sub-Issue (padronizado com prefixo `[SUB-XX]`);
2. **Assignee:** Responsável pela execução (`Vinicius Martins Nunes`);
3. **Status:** Os 5 estados definidos (`Backlog`, `Ready`, `In Progress`, `In Review`, `Done`);
4. **Labels:** Categorias visuais definidas no Artefato 7;
5. **Iteration / Milestone:** `Sprint 01 — Primeiro Slice Arquitetural (UC01)`;
6. **Estimate / Complexity:** Escala numérica ou de tamanho (opcional: P, M, G).

