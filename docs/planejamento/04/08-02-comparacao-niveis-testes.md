# Artefato 08-02: Comparação entre Níveis de Testes
**Caso de Uso:** UC04 — Controle de Acesso de Visitantes  
**Status:** Bloqueado em Backlog  

---

## 1. Estratégia de Testes Prevista
1. **Unitário de Domínio:** Validação das regras invariantes da entidade de UC04 — Controle de Acesso de Visitantes.
2. **Unitário de Controller:** Validação do `RegisterVisitorAccessDto` e mapeamento de rotas.
3. **Integrado de Backend:** Validação da rota `POST /visitantes/acesso` com repositório em memória mock-free.
4. **E2E com Banco Real:** Validação de transações e restrições relacionais com TypeORM e PostgreSQL.

## 2. Status Atual de Execução
Nenhum teste foi executado neste estágio devido ao bloqueio de dependência por Definição de Portaria e Acesso.
