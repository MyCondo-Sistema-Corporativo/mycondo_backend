# Artefato 08-02: Comparação entre Níveis de Testes
**Caso de Uso:** UC03 — Gestão de Inadimplência e Bloqueio  
**Status:** Bloqueado em Backlog  

---

## 1. Estratégia de Testes Prevista
1. **Unitário de Domínio:** Validação das regras invariantes da entidade de UC03 — Gestão de Inadimplência e Bloqueio.
2. **Unitário de Controller:** Validação do `BlockDefaulterDto` e mapeamento de rotas.
3. **Integrado de Backend:** Validação da rota `POST /inadimplencias/bloqueio` com repositório em memória mock-free.
4. **E2E com Banco Real:** Validação de transações e restrições relacionais com TypeORM e PostgreSQL.

## 2. Status Atual de Execução
Nenhum teste foi executado neste estágio devido ao bloqueio de dependência por UC01 e Regra de Elegibilidade.
