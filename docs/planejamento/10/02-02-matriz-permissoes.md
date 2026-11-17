# 02-02 - Matriz de Permissoes do GitHub

**UC:** UC10 - Registrar e conciliar pagamento
**Issue:** [#12](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/12)
**Ator principal:** Administradora / Gateway
**Modulo candidato:** `src/modules/finance/`
**Situacao herdada:** Nao implementado; sem fluxo financeiro.
**Equipe:** nao informada nos artefatos consultados; nomes, usuarios, assignees e revisores permanecem `A definir`.

| Integrante | Papel funcional | Operacoes necessarias | Permissao recomendada | Project | Justificativa |
|---|---|---|---|---|---|
| A definir | Coordenacao | Issues, Project, revisoes e acompanhamento | Triage ou Write | Editor conforme necessidade | Menor privilegio; Admin nao e necessario por padrao |
| A definir | Responsavel tecnico | Branches, PRs e revisao de codigo | Write | Editor | Desenvolvimento sem permissao administrativa |
| A definir | Desenvolvedor | Branch, push e PR | Write | Contributor | Permite desenvolvimento diario |
| A definir | Revisor | Issues, comentarios e revisao de PR | Triage ou Write | Viewer/Editor | Revisar sem acesso administrativo |

Esta e uma recomendacao; nao altera permissoes reais. Os cinco niveis de repositorio sao Read, Triage, Write, Maintain e Admin. O acesso ao Project e separado do acesso ao repositorio.
