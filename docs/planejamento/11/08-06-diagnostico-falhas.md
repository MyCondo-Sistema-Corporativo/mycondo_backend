# Artefato 08-06: Diagnóstico de Falhas de Injeção de Dependência e Contexto Isolado
**Caso de Uso:** UC11 — Comunicados do Síndico  
**Status:** Bloqueado em Backlog  

---

## 1. Diretrizes para Mitigação de Falhas de DI
Quando o módulo `NoticesModule` for criado para testes isolados:
1. Sempre prover `INOTICESREPOSITORY` explicitamente no `Test.createTestingModule`.
2. Assegurar que o Caso de Uso `PublishNoticeUseCase` seja fornecido via `useFactory` ou `useClass`.
3. Manter a suíte isolada de módulos que instanciem conexões físicas de banco de dados.
