# 04-03 — Preparacao da Branch de Trabalho

**UC:** UC03 — Cancelar reserva
**Issue:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/03/`

---

## 1. Convencao de Nomenclatura Adotada

- **Padrao da Disciplina:** `feature/<issue-id>-<descricao-curta>` ou `test/<issue-id>-<descricao-curta>`
- **Nome Planejado da Branch:** `feature/issue-5-uc03-cancelar-reserva-test`
- **Branch Base de Destino:** `master`
- **Sub-Issue Vinculada:** SUB-06 (Testes automatizados de cancelamento de reserva)

---

## 2. Comandos Operacionais Padronizados

Para iniciar o desenvolvimento quando a DoR for desbloqueada:

```bash
# 1. Sincronizar com a master remota
git switch master
git pull --ff-only origin master

# 2. Criar e alternar para a branch dedicada a Issue #5
git switch -c feature/issue-5-uc03-cancelar-reserva-test

# 3. Publicar a branch com upstream configurado
git push -u origin feature/issue-5-uc03-cancelar-reserva-test

# 4. Confirmar o isolamento
git branch -vv
```

---

## 3. Estado Operacional Atual

- **Status da Branch:** Planejada formalmente.
- **Criacao Remota:** Nao antecipada neste momento para evitar branches orfas sem codigo executavel ativo.
- **Garantia:** O trabalho no UC03 ocorrera estritamente isolado sem afetar o UC01 ou a linha principal.
