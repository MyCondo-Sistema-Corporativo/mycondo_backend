# Artefato 08-06: Diagnóstico de Falhas de Injeção de Dependência e Contexto Isolado
**Caso de Uso:** UC05 — Registro de Ocorrências  
**Status:** Bloqueado em Backlog  

---

## 1. Diretrizes para Mitigação de Falhas de DI
Quando o módulo `IncidentsModule` for criado para testes isolados:
1. Sempre prover `IINCIDENTSREPOSITORY` explicitamente no `Test.createTestingModule`.
2. Assegurar que o Caso de Uso `ReportIncidentUseCase` seja fornecido via `useFactory` ou `useClass`.
3. Manter a suíte isolada de módulos que instanciem conexões físicas de banco de dados.
