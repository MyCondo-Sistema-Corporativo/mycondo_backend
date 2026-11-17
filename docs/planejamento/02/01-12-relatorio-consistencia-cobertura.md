# Artefato 12 - Caso de Uso UC02

**Caso de uso:** UC02 - Confirmar reserva mediante pagamento ou aprovacao  
**Ator:** Morador / Sindico  
**Resultado:** Reserva confirmada ou impedida  
**Modulo candidato:** `src/modules/reservations/`  
**Situacao:** Nao implementado; documentado conceitualmente no Trabalho 6

## Objetivo e escopo
O sistema deve receber a intencao do ator, validar autorizacao e pre-condicoes, aplicar as regras do dominio, persistir o fato e devolver resultado rastreavel. Este pacote cobre o fluxo HTTP, aplicacao, dominio, portas, persistencia, auditoria, erros e testes. UI e integracoes externas nao necessarias ficam fora do primeiro slice.

## Fluxo principal
1. Receber dados obrigatorios e validar formato.
2. Consultar identidade, politicas e colaboradores.
3. Aplicar as regras: pagamento reconhecido; aprovacao; transicao idempotente.
4. Persistir atomicamente e retornar o identificador.
5. Disparar consequencias por portas explicitas.

## Excecoes e aceite
Dados invalidos, falta de permissao, estado incompativel, duplicidade e falhas de persistencia devem ser explicitos, sem sucesso falso. O fluxo feliz, as excecoes, a persistencia, o historico, os testes e a documentacao devem estar comprovados.

## Decomposicao e rastreabilidade
- SUB-01: agregado, estados e invariantes do dominio.
- SUB-02: commands, DTOs e portas.
- SUB-03: handler de aplicacao.
- SUB-04: controller e respostas semanticas.
- SUB-05: repositorio e adaptadores.
- SUB-06: testes unitarios, integracao e e2e.

## Operacao e governanca
Labels: `uc:UC02`, `type:epic`, `type:sub-issue`, `area:domain`, `area:application`, `area:api`, `area:test`, `status:not-implemented`. Project: Backlog -> Ready -> In Progress -> In Review -> Done. Mover para Done somente com evidencia.

## Checklist
- [ ] Regras e estados definidos.
- [ ] Autorizacao, idempotencia e concorrencia avaliadas.
- [ ] Persistencia e auditoria consistentes.
- [ ] Testes e2e, integracao e unitarios passam.
- [ ] Build, lint, matriz e issues atualizados.
