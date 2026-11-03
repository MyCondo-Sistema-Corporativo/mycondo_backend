# Artefato 7 — Plano de Labels para o Repositório GitHub

**Sistema:** MyCondo — Plataforma Integrada de Gestão de Condomínios  
**Caso de Uso:** UC01 — Solicitar Reserva de Área Comum  
**Responsável Técnico:** Vinicius Martins Nunes  
**Repositório Alvo:** `https://github.com/MyCondo-Sistema-Corporativo/mycondo-backend`  
**Data do Planejamento:** 03 de novembro de 2026  

---

## 1. Estratégia de Taxonomia e Governança de Labels

Para assegurar a organização visual, facilidade de filtragem e governança no repositório GitHub do projeto **MyCondo**, foi estruturada uma taxonomia padronizada baseada em prefixos funcionais:

- `domain:` — Identifica o Bounded Context / Módulo de negócio a que o item pertence.
- `type:` — Classifica a natureza técnica da entrega (Épico, Feature, Teste, Documentação, etc.).
- `layer:` — Especifica a camada da arquitetura de software impactada.
- `priority:` — Indica a relevância no backlog conforme a metodologia MoSCoW.
- `status:` — Sinaliza a condição de prontidão ou impedimento no fluxo de trabalho.

---

## 2. Catálogo Padronizado de Labels

| Prefixo / Categoria | Nome da Label | Cor Hex | Finalidade / Descrição | Issues / Sub-Issues Onde Será Aplicada |
| :--- | :--- | :---: | :--- | :--- |
| **Domínio / Módulo** | `domain:reservas` | `#0E8A16` | Itens vinculados ao Módulo de Gestão de Reservas e Áreas Comuns. | Épico `[UC01]`, `SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06` |
| | `domain:financeiro` | `#006B75` | Itens relacionados a cobranças, taxas e integração financeira. | Épico `[UC01]`, `SUB-02`, `SUB-03`, `SUB-05` |
| | `domain:iam` | `#5319E7` | Itens relacionados a controle de acessos, moradores e unidades. | Épico `[UC01]`, `SUB-02`, `SUB-03` |
| **Tipo de Atividade** | `type:epic` | `#3E4B9E` | Issue principal de nível macro que agrega múltiplas sub-issues técnicas. | Épico `[UC01]` |
| | `type:feature` | `#1D76DB` | Desenvolvimento de nova capacidade funcional ou técnica no sistema. | `SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05` |
| | `type:test` | `#FBCA04` | Criação e aprimoramento de suítes de testes automatizados. | `SUB-06` |
| | `type:documentation`| `#0075CA` | Elaboração de artefatos de planejamento, especificações e relatórios. | Issues e PRs de governança |
| | `type:chore` | `#D4C5F9` | Tarefas de configuração de build, dependências ou ferramentas de CI/CD. | Manutenções estruturais |
| **Camada / Arquitetura** | `layer:domain` | `#B60205` | Núcleo de domínio (Entidades, Objetos de Valor, Invariantes). | `SUB-01` |
| | `layer:application` | `#D93F0B` | Camada de orquestração (Handlers, Portas, Commands, DTOs internos). | `SUB-02`, `SUB-03` |
| | `layer:presentation`| `#F9D0C4` | Fronteira externa (Controllers HTTP, Exception Filters, DTOs de rota). | `SUB-04` |
| | `layer:infrastructure`|`#BFDADC`| Detalhes de infraestrutura (Repositórios, Adaptadores, IoC NestJS). | `SUB-05` |
| | `layer:test` | `#FEF2C0` | Infraestrutura e cenários de testes automatizados (Vitest). | `SUB-06` |
| **Prioridade (MoSCoW)** | `priority:must-have` | `#B60205` | Requisito indispensável para a entrega do primeiro slice do MVP. | Épico `[UC01]`, `SUB-01`, `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06` |
| | `priority:should-have`|`#FBCA04` | Capacidade importante mas não impeditiva no primeiro dia. | Itens futuros (ex.: concorrência no Postgres) |
| | `priority:nice-to-have`|`#0E8A16` | Melhoria desejável para sprints posteriores. | Itens de polimento de logs |
| **Status / Prontidão** | `status:ready` | `#0E8A16` | Atende à Definition of Ready e está apta para início imediato. | `SUB-01` (inicialmente) |
| | `status:blocked` | `#B60205` | Aguarda conclusão de dependência técnica ou decisão de equipe. | `SUB-02`, `SUB-03`, `SUB-04`, `SUB-05`, `SUB-06` (inicialmente) |

---

## 3. Matriz de Aplicação das Labels nas Sub-Issues

| Identificador da Issue | Labels Aplicadas |
| :--- | :--- |
| **Épico `[UC01]`** | `domain:reservas`, `type:epic`, `priority:must-have` |
| **`SUB-01` (Domínio)** | `domain:reservas`, `layer:domain`, `type:feature`, `priority:must-have`, `status:ready` |
| **`SUB-02` (Portas)** | `domain:reservas`, `domain:financeiro`, `domain:iam`, `layer:application`, `type:feature`, `priority:must-have`, `status:blocked` |
| **`SUB-03` (Handler)** | `domain:reservas`, `domain:financeiro`, `layer:application`, `type:feature`, `priority:must-have`, `status:blocked` |
| **`SUB-04` (Fronteira HTTP)** | `domain:reservas`, `layer:presentation`, `type:feature`, `priority:must-have`, `status:blocked` |
| **`SUB-05` (Persistência)** | `domain:reservas`, `layer:infrastructure`, `type:feature`, `priority:must-have`, `status:blocked` |
| **`SUB-06` (Testes Vitest)** | `domain:reservas`, `layer:test`, `type:test`, `priority:must-have`, `status:blocked` |

