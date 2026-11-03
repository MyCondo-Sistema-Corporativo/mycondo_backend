# Artefato 11 — Checklist de Validação Pré-Submissão

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Data da Auditoria:** 03 de novembro de 2026  

---

## 1. Finalidade

Esta lista de verificação (*Checklist de Conformidade*) deve ser utilizada pelo estudante para auditar a completude e o rigor metodológico de todo o planejamento técnico elaborado antes de realizar a submissão formal da atividade acadêmica ou de iniciar a implementação do código no GitHub.

---

## 2. Checklist de Conformidade Metodológica

| Item | Critério de Validação | Status de Auditoria | Observações e Evidências |
| :---: | :--- | :---: | :--- |
| **1** | **Issue Principal (Épico) devidamente documentada** | [x] Conforme | O Artefato 3 documenta o épico `[UC01] Solicitar Reserva de Área Comum`, contendo objetivo, contexto, escopo, referências formais, requisitos, checklist de sub-issues e critérios de prontidão (DoR/DoD). |
| **2** | **Pelo menos 5 Sub-Issues com justificativa técnica** | [x] Conforme | Foram geradas 6 Sub-Issues completas e justificadas (`SUB-01` a `SUB-06`), cobrindo domínio, portas, aplicação, fronteira HTTP, adaptadores e suíte de testes automatizados, sem divisão artificial de fases de TDD. |
| **3** | **Critérios de aceite claros, objetivos e verificáveis** | [x] Conforme | Cada sub-issue possui critérios de aceite com caixas de seleção `- [ ]` que expressam comportamentos testáveis e determinísticos (ex.: retorno HTTP, cálculo de sobreposição, disparo de exceções negociais). |
| **4** | **Dependências mapeadas sem bloqueios circulares** | [x] Conforme | A Matriz de Dependências (Artefato 6) mapeia as precedências em formato de Grafo Acíclico Dirigido (DAG), garantindo que o domínio seja o primeiro a ser executado e que não existam ciclos. |
| **5** | **Labels estruturadas e atribuídas consistentemente** | [x] Conforme | O Artefato 7 estabelece uma taxonomia coerente com prefixos `domain:`, `type:`, `layer:`, `priority:` e `status:`, mapeando as cores e as atribuições para cada issue. |
| **6** | **GitHub Project configurado estritamente com os 5 estados** | [x] Conforme | O Artefato 8 padroniza o Kanban com exatamente os 5 estados da metodologia: `Backlog`, `Ready`, `In Progress`, `In Review` e `Done`, vedando nomes divergentes ("Todo", etc.). |
| **7** | **Estado inicial condizente com a fase de planejamento** | [x] Conforme | Nenhuma issue inicia em andamento ou concluída; `SUB-01` inicia em `Ready` (atende à DoR) e as demais (`SUB-02` a `SUB-06` e o Épico) iniciam em `Backlog`, refletindo a fase pura de planejamento. |
| **8** | **Rastreabilidade garantida com o caso de uso** | [x] Conforme | A Matriz de Rastreabilidade (Artefato 5) cobre 100% dos requisitos funcionais (RF-01 a RF-07), regras de negócio (RN-01 a RN-06) e fluxos alternativos (FA01 a FA06). |
| **9** | **Ausência de tarefas redundantes ou inventadas** | [x] Conforme | Todos os comportamentos planejados derivam da documentação do MyCondo (`trabalho_6_sistema_condominio.md`); não foram criadas tarefas fictícias nem aplicados conceitos externos do CeliLac. |
| **10** | **Integridade das restrições de planejamento** | [x] Conforme | Nenhuma linha de código funcional foi implementada, nenhuma branch foi aberta e nenhum commit de funcionalidade foi antecipado neste momento. |

---

## 3. Parecer Final de Prontidão

- **Resultado da Avaliação:** **APROVADO SEM RESSALVAS**
- **Conclusão:** O planejamento técnico do primeiro slice do MyCondo atende a todos os requisitos didáticos e arquiteturais estabelecidos pelo material de Sistemas Corporativos, estando apto para a configuração no GitHub e futura implementação pela equipe.

