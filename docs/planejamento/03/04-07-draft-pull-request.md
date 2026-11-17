# 04-07 — Minuta do Draft Pull Request

**UC:** UC03 — Cancelar reserva
**Issue Vinculada:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/03/`

---

## 1. Dados Cadastrais do Pull Request

- **Titulo:** `test(03): add initial RED test for Cancelar reserva (ref #5)`
- **Branch de Origem (Head):** `feature/issue-5-uc03-cancelar-reserva-test`
- **Branch de Destino (Base):** `master`
- **Tipo de PR:** **Draft Pull Request (Rascunho em Progresso)**

---

## 2. Minuta Formatada para Submissao no GitHub

```markdown
## 📝 Draft Pull Request — [UC03] Cancelar reserva

### 📌 Issue Vinculada
Ref: #5

### 🎯 Objetivo desta Alteracao
Estabelecer o primeiro teste automatizado na fase RED do ciclo TDD para o caso de uso **UC03 — Cancelar reserva**, validando o criterio de aceite prioritario:
> "Cancelar reserva ativa (PENDING ou CONFIRMED) mediante solicitacao do titular ou sindico com motivo informado, transicionando status para CANCELLED."

### 🛠️ Alteracoes Incluidas
- Criacao do arquivo de teste: `src/modules/reservations/use-cases/cancel-reservation.use-case.spec.ts`
- Implementacao do cenario de teste unitario seguindo o padrao AAA (Arrange, Act, Assert).

### 🧪 Evidencia da Fase RED (TDD)
O teste foi especificado para falhar de forma funcional pela ausencia da implementacao negocial no modulo `src/modules/reservations/`.

### ⏳ Estado Atual e Proximos Passos
- [x] Branch de trabalho planejada: `feature/issue-5-uc03-cancelar-reserva-test`
- [x] Teste automatizado especificado (Padrao AAA)
- [ ] Execucao e registro da falha funcional no terminal
- [ ] Implementacao de codigo de producao para satisfazer o teste (fase GREEN — Material 05)
- [ ] Refatoracao e limpeza de codigo (fase REFACTOR — Material 06)

⚠️ **ATENCAO: Este Pull Request e um RASCUNHO (DRAFT) e NAO DEVE SER INTEGRADO (MERGE) ate a conclusao das fases GREEN e REFACTOR.**
```

---

## 3. Estado no GitHub

- **Status:** Minuta pronta para submissao imediata assim que a branch `feature/issue-5-uc03-cancelar-reserva-test` for enviada com o teste RED real.
- **URL do PR:** Sera preenchida no fechamento da issue apos a criacao do Pull Request no GitHub.
