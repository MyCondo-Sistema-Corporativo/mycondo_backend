# Artefato 10 — Roteiro Operacional de Configuração no GitHub

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Repositório:** [https://github.com/MyCondo-Sistema-Corporativo/mycondo-backend](https://github.com/MyCondo-Sistema-Corporativo/mycondo-backend)  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Visão Geral

Este roteiro fornece o passo a passo prático e sequencial para que o estudante realize manualmente a configuração de todo o planejamento técnico no GitHub, materializando os artefatos produzidos (Issues, Labels, Sub-Issues e Project Board) no repositório oficial da organização.

---

## 2. Passo a Passo Sequencial de Configuração

### Passo 1: Acessar o Repositório e Configurar as Labels
1. Acesse o repositório oficial no navegador: `https://github.com/MyCondo-Sistema-Corporativo/mycondo-backend`.
2. Clique na aba **Issues** e, em seguida, no botão **Labels** (ao lado da barra de busca).
3. Revise as labels existentes e crie as novas labels padronizadas conforme o **Artefato 7 — Plano de Labels**:
   - Crie as labels de domínio: `domain:reservas`, `domain:financeiro`, `domain:iam`;
   - Crie as labels de tipo: `type:epic`, `type:feature`, `type:test`, `type:documentation`, `type:chore`;
   - Crie as labels de camada: `layer:domain`, `layer:application`, `layer:presentation`, `layer:infrastructure`, `layer:test`;
   - Crie as labels de prioridade: `priority:must-have`, `priority:should-have`, `priority:nice-to-have`;
   - Crie as labels de prontidão: `status:ready`, `status:blocked`.
   *(Utilize as cores hexadecimais sugeridas na tabela do Artefato 7).*

---

### Passo 2: Criar a Issue Principal (Épico)
1. Na aba **Issues**, clique no botão verde **New issue**.
2. No campo **Title**, insira exatamente:
   ```text
   [UC01] Solicitar Reserva de Área Comum
   ```
3. No campo de descrição, copie e cole integralmente o conteúdo em Markdown do **Artefato 3 — Issue Principal (Epic)**.
4. Na barra lateral direita:
   - Em **Assignees**, selecione `Vinicius Martins Nunes` (ou seu usuário GitHub);
   - Em **Labels**, atribua: `domain:reservas`, `type:epic`, `priority:must-have`.
5. Clique em **Submit new issue**.
6. Anote o número da issue gerada (exemplo: `#1`).

---

### Passo 3: Criar as 6 Sub-Issues Técnicas
Para cada uma das unidades de trabalho especificadas no **Artefato 4 — Sub-Issues Completas**, repita o procedimento de criação:

1. **Sub-Issue 01:**
   - **Title:** `[SUB-01] Modelagem do Domínio e Invariantes da Reserva`
   - **Description:** Conteúdo da Sub-Issue 01 do Artefato 4.
   - **Labels:** `domain:reservas`, `layer:domain`, `type:feature`, `priority:must-have`, `status:ready`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#2`).

2. **Sub-Issue 02:**
   - **Title:** `[SUB-02] Especificação de Contratos e Portas da Aplicação`
   - **Description:** Conteúdo da Sub-Issue 02 do Artefato 4.
   - **Labels:** `domain:reservas`, `domain:financeiro`, `domain:iam`, `layer:application`, `type:feature`, `priority:must-have`, `status:blocked`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#3`).

3. **Sub-Issue 03:**
   - **Title:** `[SUB-03] Implementação do Serviço de Aplicação (Handler)`
   - **Description:** Conteúdo da Sub-Issue 03 do Artefato 4.
   - **Labels:** `domain:reservas`, `domain:financeiro`, `layer:application`, `type:feature`, `priority:must-have`, `status:blocked`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#4`).

4. **Sub-Issue 04:**
   - **Title:** `[SUB-04] Implementação da Fronteira HTTP REST`
   - **Description:** Conteúdo da Sub-Issue 04 do Artefato 4.
   - **Labels:** `domain:reservas`, `layer:presentation`, `type:feature`, `priority:must-have`, `status:blocked`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#5`).

5. **Sub-Issue 05:**
   - **Title:** `[SUB-05] Implementação da Persistência e Adaptadores de Infraestrutura`
   - **Description:** Conteúdo da Sub-Issue 05 do Artefato 4.
   - **Labels:** `domain:reservas`, `layer:infrastructure`, `type:feature`, `priority:must-have`, `status:blocked`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#6`).

6. **Sub-Issue 06:**
   - **Title:** `[SUB-06] Implementação da Suíte de Testes Automatizados (Vitest)`
   - **Description:** Conteúdo da Sub-Issue 06 do Artefato 4.
   - **Labels:** `domain:reservas`, `layer:test`, `type:test`, `priority:must-have`, `status:blocked`.
   - **Assignee:** `Vinicius Martins Nunes`.
   - Anote o número gerado (ex.: `#7`).

---

### Passo 4: Vincular as Sub-Issues na Issue Principal (Tasklist)
1. Abra a Issue principal `[UC01]` criada no Passo 2.
2. Clique no ícone de edição (três pontos $\rightarrow$ **Edit**).
3. Na seção **5. Relação de Sub-Issues Planejadas**, atualize as linhas da checklist substituindo os identificadores provisórios pelos links reais das issues criadas (utilizando a sintaxe `#numero` do GitHub):
   ```markdown
   - [ ] #2 - [SUB-01] Modelagem do Domínio e Invariantes da Reserva
   - [ ] #3 - [SUB-02] Especificação de Contratos e Portas da Aplicação
   - [ ] #4 - [SUB-03] Implementação do Serviço de Aplicação (Handler)
   - [ ] #5 - [SUB-04] Implementação da Fronteira HTTP REST
   - [ ] #6 - [SUB-05] Implementação da Persistência e Adaptadores de Infraestrutura
   - [ ] #7 - [SUB-06] Implementação da Suíte de Testes Automatizados (Vitest)
   ```
4. Salve as alterações clicando em **Update comment**. O GitHub transformará automaticamente a lista em uma tasklist com barra de progresso visual.

---

### Passo 5: Criar e Configurar o GitHub Project
1. No menu superior da organização ou repositório, clique na aba **Projects**.
2. Clique no botão **New project**, selecione o template **Board** e dê o nome:
   ```text
   MyCondo — Gestão do Primeiro Slice (UC01)
   ```
3. Clique em **Create project**.
4. Configure a coluna padrão **Status**:
   - Clique no cabeçalho do campo **Status** e selecione **Edit settings**;
   - Ajuste as opções para conter **rigorosamente os 5 estados da metodologia**:
     1. `Backlog`
     2. `Ready`
     3. `In Progress`
     4. `In Review`
     5. `Done`
   - Exclua quaisquer opções excedentes (como "Todo").

---

### Passo 6: Inserir as Issues no GitHub Project e Ajustar Status Inicial
1. No Board recém-configurado, clique no botão **+ Add item** na parte inferior das colunas ou pressione a barra de espaço para pesquisar as issues do repositório.
2. Adicione a Issue Principal `[UC01]` e posicione-a na coluna `Backlog`.
3. Adicione a Sub-Issue `[SUB-01]` e posicione-a na coluna `Ready`.
4. Adicione as Sub-Issues `[SUB-02]`, `[SUB-03]`, `[SUB-04]`, `[SUB-05]` e `[SUB-06]` e posicione-as na coluna `Backlog`.
5. Confirme que o campo **Assignee** de todas as issues esteja preenchido com `Vinicius Martins Nunes`.

---

### Passo 7: Revisão Final de Rastreabilidade e Governança
1. Acesse o Project Board e confira se a visualização reflete com precisão o planejamento:
   - 1 card na coluna `Ready` (`[SUB-01]`);
   - 6 cards na coluna `Backlog` (`[UC01]`, `[SUB-02]`, `[SUB-03]`, `[SUB-04]`, `[SUB-05]`, `[SUB-06]`);
   - 0 cards em `In Progress`, `In Review` ou `Done` (respeitando a regra de que estamos em fase estrita de planejamento).
2. Abra a Issue Principal `[UC01]` e certifique-se de que todas as 6 Sub-Issues aparecem com link ativo na tasklist e que o painel lateral exibe a associação ao Project Board configurado.

