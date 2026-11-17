# 04-07 — Minuta do Draft Pull Request

**UC:** UC12 — Realizar votacao em assembleia
**Issue Vinculada:** [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/12/`

---

## 1. Dados Cadastrais do Pull Request

- **Titulo:** `test(12): add initial RED test for Realizar votacao em assembleia (ref #14)`
- **Branch de Origem (Head):** `feature/issue-14-uc12-votacao-assembleia-test`
- **Branch de Destino (Base):** `master`
- **Tipo de PR:** **Draft Pull Request (Rascunho em Progresso)**

---

## 2. Minuta Formatada para Submissao no GitHub

```markdown
## 📝 Draft Pull Request — [UC12] Realizar votacao em assembleia

### 📌 Issue Vinculada
Ref: #14

### 🎯 Objetivo desta Alteracao
Estabelecer o primeiro teste automatizado na fase RED do ciclo TDD para o caso de uso **UC12 — Realizar votacao em assembleia**, validando o criterio de aceite prioritario:
> "Registrar voto de morador adimplente em pauta de assembleia virtual aberta, computando a escolha e garantindo unicidade do voto por unidade autonoma."

### 🛠️ Alteracoes Incluidas
- Criacao do arquivo de teste: `src/modules/assemblies/use-cases/cast-assembly-vote.use-case.spec.ts`
- Implementacao do cenario de teste unitario seguindo o padrao AAA (Arrange, Act, Assert).

### 🧪 Evidencia da Fase RED (TDD)
O teste foi especificado para falhar de forma funcional pela ausencia da implementacao negocial no modulo `src/modules/assemblies/`.

### ⏳ Estado Atual e Proximos Passos
- [x] Branch de trabalho planejada: `feature/issue-14-uc12-votacao-assembleia-test`
- [x] Teste automatizado especificado (Padrao AAA)
- [ ] Execucao e registro da falha funcional no terminal
- [ ] Implementacao de codigo de producao para satisfazer o teste (fase GREEN — Material 05)
- [ ] Refatoracao e limpeza de codigo (fase REFACTOR — Material 06)

⚠️ **ATENCAO: Este Pull Request e um RASCUNHO (DRAFT) e NAO DEVE SER INTEGRADO (MERGE) ate a conclusao das fases GREEN e REFACTOR.**
```

---

## 3. Estado no GitHub

- **Status:** Minuta pronta para submissao imediata assim que a branch `feature/issue-14-uc12-votacao-assembleia-test` for enviada com o teste RED real.
- **URL do PR:** Sera preenchida no fechamento da issue apos a criacao do Pull Request no GitHub.
