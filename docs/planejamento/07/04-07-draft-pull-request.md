# 04-07 — Minuta do Draft Pull Request

**UC:** UC07 — Abrir ocorrencia
**Issue Vinculada:** [#9](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/07/`

---

## 1. Dados Cadastrais do Pull Request

- **Titulo:** `test(07): add initial RED test for Abrir ocorrencia (ref #9)`
- **Branch de Origem (Head):** `feature/issue-9-uc07-abrir-ocorrencia-test`
- **Branch de Destino (Base):** `master`
- **Tipo de PR:** **Draft Pull Request (Rascunho em Progresso)**

---

## 2. Minuta Formatada para Submissao no GitHub

```markdown
## 📝 Draft Pull Request — [UC07] Abrir ocorrencia

### 📌 Issue Vinculada
Ref: #9

### 🎯 Objetivo desta Alteracao
Estabelecer o primeiro teste automatizado na fase RED do ciclo TDD para o caso de uso **UC07 — Abrir ocorrencia**, validando o criterio de aceite prioritario:
> "Registrar ocorrencia pelo morador com categoria, descricao e unidade, atribuindo protocolo unico e status OPEN."

### 🛠️ Alteracoes Incluidas
- Criacao do arquivo de teste: `src/modules/occurrences/use-cases/open-occurrence.use-case.spec.ts`
- Implementacao do cenario de teste unitario seguindo o padrao AAA (Arrange, Act, Assert).

### 🧪 Evidencia da Fase RED (TDD)
O teste foi especificado para falhar de forma funcional pela ausencia da implementacao negocial no modulo `src/modules/occurrences/`.

### ⏳ Estado Atual e Proximos Passos
- [x] Branch de trabalho planejada: `feature/issue-9-uc07-abrir-ocorrencia-test`
- [x] Teste automatizado especificado (Padrao AAA)
- [ ] Execucao e registro da falha funcional no terminal
- [ ] Implementacao de codigo de producao para satisfazer o teste (fase GREEN — Material 05)
- [ ] Refatoracao e limpeza de codigo (fase REFACTOR — Material 06)

⚠️ **ATENCAO: Este Pull Request e um RASCUNHO (DRAFT) e NAO DEVE SER INTEGRADO (MERGE) ate a conclusao das fases GREEN e REFACTOR.**
```

---

## 3. Estado no GitHub

- **Status:** Minuta pronta para submissao imediata assim que a branch `feature/issue-9-uc07-abrir-ocorrencia-test` for enviada com o teste RED real.
- **URL do PR:** Sera preenchida no fechamento da issue apos a criacao do Pull Request no GitHub.
