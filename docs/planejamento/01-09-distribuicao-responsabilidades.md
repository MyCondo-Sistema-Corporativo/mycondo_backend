# Artefato 9 — Distribuição de Responsabilidades da Equipe

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico / Desenvolvedor:** Vinicius Martins Nunes  
**Organização:** [MyCondo - Sistema Corporativo](https://github.com/MyCondo-Sistema-Corporativo)  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Matriz de Alocação de Responsabilidades

A tabela a seguir consolida a atribuição de papéis, responsabilidades e dependências para a futura execução do caso de uso **UC01**:

| Identificador | Atividade Técnica Planejada | Responsável Designado | Papel Técnico na Atividade | Dependências Diretas | Estado Inicial no Board |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **`[UC01]`** | Issue Principal (Épico) — Solicitar Reserva de Área Comum | Vinicius Martins Nunes | Líder Técnico / Engenheiro de Software | Todas as Sub-Issues | `Backlog` |
| **`[SUB-01]`** | Modelagem do Domínio e Invariantes da Reserva | Vinicius Martins Nunes | Desenvolvedor de Domínio | Nenhuma | `Ready` |
| **`[SUB-02]`** | Especificação de Contratos e Portas da Aplicação | Vinicius Martins Nunes | Arquiteto / Desenvolvedor Backend | `SUB-01` | `Backlog` |
| **`[SUB-03]`** | Implementação do Serviço de Aplicação (Handler) | Vinicius Martins Nunes | Desenvolvedor Backend | `SUB-01`, `SUB-02` | `Backlog` |
| **`[SUB-04]`** | Implementação da Fronteira HTTP REST | Vinicius Martins Nunes | Desenvolvedor Backend / API | `SUB-02`, `SUB-03` | `Backlog` |
| **`[SUB-05]`** | Implementação da Persistência e Adaptadores | Vinicius Martins Nunes | Desenvolvedor Backend / Infraestrutura | `SUB-02`, `SUB-03` | `Backlog` |
| **`[SUB-06]`** | Implementação da Suíte de Testes Automatizados | Vinicius Martins Nunes | Engenheiro de Qualidade (QA) / Backend | `SUB-01` a `SUB-05` | `Backlog` |

---

## 2. Recomendações de Governança, Comunicação e Alinhamento

Mesmo em contextos de desenvolvimento individual ou em equipes acadêmicas enxutas, a adoção de padrões formais de comunicação e rastreabilidade técnica garante a sustentabilidade e a auditabilidade do software:

1. **Gestão do Fluxo de Trabalho (WIP Limits):**
   - Evitar manter múltiplas Sub-Issues com status `In Progress` simultaneamente. A regra de ouro é: *concluir uma tarefa antes de puxar a próxima*.
   - Seguir estritamente o fluxo sequencial: concluir `SUB-01` $\rightarrow$ transitar `SUB-02` para `Ready` $\rightarrow$ implementar `SUB-02`, e assim sucessivamente.
2. **Rastreabilidade por Branches Padronizadas:**
   - Para cada Sub-Issue, criar branch de curta duração apontando para a tarefa:
     - `feature/sub-01-dominio-invariantes`
     - `feature/sub-02-portas-contratos`
     - `feature/sub-03-handler-aplicacao`
     - `feature/sub-04-controller-http`
     - `feature/sub-05-adaptadores-infra`
     - `feature/sub-06-testes-automatizados`
3. **Padrão de Mensagens de Commit (Conventional Commits):**
   - Utilizar mensagens estruturadas com referência explícita à Sub-Issue:
     - `feat(domain): modelar entidade reserva e objeto de valor periodo (refs #SUB-01)`
     - `feat(application): criar contratos das portas secundarias (refs #SUB-02)`
     - `test(e2e): adicionar suites vitest para controller de reservas (refs #SUB-06)`
4. **Revisão de Código e Pull Requests (PRs):**
   - Cada Pull Request deve vincular a respectiva Issue através das palavras-chave do GitHub (ex.: `Closes #123`), contendo descrição objetiva do que foi alterado, checklist de critérios de aceite atendidos e evidência da execução dos testes com sucesso.

