# Artefato 08-06: Diagnóstico de Falhas de Injeção de Dependência e Contexto Isolado
**Caso de Uso:** UC02 — Cancelar Reserva de Área Comum  
**Status:** Bloqueado em Backlog  

---

## 1. Diretrizes para Mitigação de Falhas de DI
Quando o módulo `ReservationsModule / CancellationService` for criado para testes isolados:
1. Sempre prover `IRESERVATIONSREPOSITORY` explicitamente no `Test.createTestingModule`.
2. Assegurar que o Caso de Uso `CancelReservationUseCase` seja fornecido via `useFactory` ou `useClass`.
3. Manter a suíte isolada de módulos que instanciem conexões físicas de banco de dados.
