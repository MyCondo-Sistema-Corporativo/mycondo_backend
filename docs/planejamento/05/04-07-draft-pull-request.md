# 04-07 — Minuta do Draft Pull Request

**UC:** UC05 — Entregar encomenda
**Issue Vinculada:** [#7](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/7)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/05/`

---

## 1. Dados Cadastrais do Pull Request

- **Titulo:** `test(05): add initial RED test for Entregar encomenda (ref #7)`
- **Branch de Origem (Head):** `feature/issue-7-uc05-entrega-encomenda-test`
- **Branch de Destino (Base):** `master`
- **Tipo de PR:** **Draft Pull Request (Rascunho em Progresso)**

---

## 2. Minuta Formatada para Submissao no GitHub

```markdown
## 📝 Draft Pull Request — [UC05] Entregar encomenda

### 📌 Issue Vinculada
Ref: #7

### 🎯 Objetivo desta Alteracao
Estabelecer o primeiro teste automatizado na fase RED do ciclo TDD para o caso de uso **UC05 — Entregar encomenda**, validando o criterio de aceite prioritario:
> "Registrar baixa de encomenda em custodia mediante identificacao do morador ou recebedor autorizado com registro de documento/assinatura, assumindo estado DELIVERED."

### 🛠️ Alteracoes Incluidas
- Criacao do arquivo de teste: `src/modules/deliveries/use-cases/deliver-package.use-case.spec.ts`
- Implementacao do cenario de teste unitario seguindo o padrao AAA (Arrange, Act, Assert).

### 🧪 Evidencia da Fase RED (TDD)
O teste foi especificado para falhar de forma funcional pela ausencia da implementacao negocial no modulo `src/modules/deliveries/`.

### ⏳ Estado Atual e Proximos Passos
- [x] Branch de trabalho planejada: `feature/issue-7-uc05-entrega-encomenda-test`
- [x] Teste automatizado especificado (Padrao AAA)
- [ ] Execucao e registro da falha funcional no terminal
- [ ] Implementacao de codigo de producao para satisfazer o teste (fase GREEN — Material 05)
- [ ] Refatoracao e limpeza de codigo (fase REFACTOR — Material 06)

⚠️ **ATENCAO: Este Pull Request e um RASCUNHO (DRAFT) e NAO DEVE SER INTEGRADO (MERGE) ate a conclusao das fases GREEN e REFACTOR.**
```

---

## 3. Estado no GitHub

- **Status:** Minuta pronta para submissao imediata assim que a branch `feature/issue-7-uc05-entrega-encomenda-test` for enviada com o teste RED real.
- **URL do PR:** Sera preenchida no fechamento da issue apos a criacao do Pull Request no GitHub.
