# Artefato 08-06: Diagnóstico de Falhas de Injeção de Dependência e Contexto Isolado
**Caso de Uso:** UC09 — Assembleias Virtuais  
**Status:** Bloqueado em Backlog  

---

## 1. Diretrizes para Mitigação de Falhas de DI
Quando o módulo `AssembliesModule` for criado para testes isolados:
1. Sempre prover `IASSEMBLIESREPOSITORY` explicitamente no `Test.createTestingModule`.
2. Assegurar que o Caso de Uso `CreateAssemblyUseCase` seja fornecido via `useFactory` ou `useClass`.
3. Manter a suíte isolada de módulos que instanciem conexões físicas de banco de dados.
