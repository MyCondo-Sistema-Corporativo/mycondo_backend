# 02-02 - Matriz de Permissoes do GitHub

**UC:** UC03 - Cancelar reserva
**Issue:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Ator principal:** Morador / Sindico
**Modulo candidato:** `src/modules/reservations/`
**Situacao herdada:** Nao implementado; sem fluxo dedicado.
**Equipe:** nao informada nos artefatos consultados; nomes, usuarios, assignees e revisores permanecem `A definir`.

| Integrante | Papel funcional | Operacoes necessarias | Permissao recomendada | Project | Justificativa |
|---|---|---|---|---|---|
| A definir | Coordenacao | Issues, Project, revisoes e acompanhamento | Triage ou Write | Editor conforme necessidade | Menor privilegio; Admin nao e necessario por padrao |
| A definir | Responsavel tecnico | Branches, PRs e revisao de codigo | Write | Editor | Desenvolvimento sem permissao administrativa |
| A definir | Desenvolvedor | Branch, push e PR | Write | Contributor | Permite desenvolvimento diario |
| A definir | Revisor | Issues, comentarios e revisao de PR | Triage ou Write | Viewer/Editor | Revisar sem acesso administrativo |

Esta e uma recomendacao; nao altera permissoes reais. Os cinco niveis de repositorio sao Read, Triage, Write, Maintain e Admin. O acesso ao Project e separado do acesso ao repositorio.
