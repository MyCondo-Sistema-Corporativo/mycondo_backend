# 04-07 — Minuta do Draft Pull Request

**UC:** UC08 — Aprovar orcamento de ordem de servico
**Issue Vinculada:** [#10](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/08/`

---

## 1. Dados Cadastrais do Pull Request

- **Titulo:** `test(08): add initial RED test for Aprovar orcamento de ordem de servico (ref #10)`
- **Branch de Origem (Head):** `feature/issue-10-uc08-aprovar-orcamento-test`
- **Branch de Destino (Base):** `master`
- **Tipo de PR:** **Draft Pull Request (Rascunho em Progresso)**

---

## 2. Minuta Formatada para Submissao no GitHub

```markdown
## 📝 Draft Pull Request — [UC08] Aprovar orcamento de ordem de servico

### 📌 Issue Vinculada
Ref: #10

### 🎯 Objetivo desta Alteracao
Estabelecer o primeiro teste automatizado na fase RED do ciclo TDD para o caso de uso **UC08 — Aprovar orcamento de ordem de servico**, validando o criterio de aceite prioritario:
> "Aprovar orcamento de ordem de servico de manutencao predial pelo sindico respeitando o teto financeiro limite, transicionando a OS para BUDGET_APPROVED."

### 🛠️ Alteracoes Incluidas
- Criacao do arquivo de teste: `src/modules/work-orders/use-cases/approve-work-order-budget.use-case.spec.ts`
- Implementacao do cenario de teste unitario seguindo o padrao AAA (Arrange, Act, Assert).

### 🧪 Evidencia da Fase RED (TDD)
O teste foi especificado para falhar de forma funcional pela ausencia da implementacao negocial no modulo `src/modules/work-orders/`.

### ⏳ Estado Atual e Proximos Passos
- [x] Branch de trabalho planejada: `feature/issue-10-uc08-aprovar-orcamento-test`
- [x] Teste automatizado especificado (Padrao AAA)
- [ ] Execucao e registro da falha funcional no terminal
- [ ] Implementacao de codigo de producao para satisfazer o teste (fase GREEN — Material 05)
- [ ] Refatoracao e limpeza de codigo (fase REFACTOR — Material 06)

⚠️ **ATENCAO: Este Pull Request e um RASCUNHO (DRAFT) e NAO DEVE SER INTEGRADO (MERGE) ate a conclusao das fases GREEN e REFACTOR.**
```

---

## 3. Estado no GitHub

- **Status:** Minuta pronta para submissao imediata assim que a branch `feature/issue-10-uc08-aprovar-orcamento-test` for enviada com o teste RED real.
- **URL do PR:** Sera preenchida no fechamento da issue apos a criacao do Pull Request no GitHub.
