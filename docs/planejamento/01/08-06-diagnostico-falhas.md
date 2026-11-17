# Artefato 08-06: Diagnóstico de Falhas de Injeção de Dependência e Contexto Isolado
**Caso de Uso:** UC01 — Reservar Área Comum  
**Data:** 17/11/2026  

---

## 1. Reprodução da Falha de Injeção de Dependência

Ao instanciar um contexto de teste isolado no NestJS contendo apenas o `ReservationsController` sem declarar seus providers:

```typescript
await Test.createTestingModule({
  controllers: [ReservationsController],
}).compile();
```

O NestJS interrompe a compilação do contêiner e lança uma exceção do tipo `UnknownDependenciesException`:

```text
Error: Nest can't resolve dependencies of the ReservationsController (?, RESERVATIONS_REPOSITORY).
Please make sure that the argument RESERVE_COMMON_AREA_USE_CASE at index [0] is available in the RootTestModule context.

Potential solutions:
- Is RootTestModule a valid NestJS module?
- If RESERVE_COMMON_AREA_USE_CASE is a provider, is it part of the current RootTestModule?
- If RESERVE_COMMON_AREA_USE_CASE is exported from a separate @Module, is that module imported within RootTestModule?
  @Module({
    imports: [ /* the Module containing RESERVE_COMMON_AREA_USE_CASE */ ]
  })
```

---

## 2. Análise da Causa Raiz em Testes Isolados

1. **Contexto Fechado do Test.createTestingModule:** Ao contrário da inicialização completa da aplicação via `AppModule`, o `Test.createTestingModule` inicializa um contexto estritamente fechado contendo apenas o que for fornecido no objeto de configuração.
2. **Tokens de Injeção de Interfaces:** O TypeScript remove interfaces em tempo de compilação (type erasure). Portanto, tokens como `@Inject(RESERVE_COMMON_AREA_USE_CASE)` e `@Inject(RESERVATIONS_REPOSITORY)` exigem mapeamento explícito com strings ou símbolos. Se não fornecidos, o contêiner não tem como inferir a implementação.
3. **Ausência de Módulo de Persistência:** Como não importamos o `TypeOrmModule` nem o banco físico no teste integrado, a dependência precisa ser provida manualmente pelo `InMemoryReservationsRepository`.

---

## 3. Protocolo de Resolução de Problemas de DI em Testes

| Etapa | Ação Técnica | Implementação Prática |
| :--- | :--- | :--- |
| **Passo 1** | Identificar o índice do parâmetro no erro | O erro apontou `index [0]` (`RESERVE_COMMON_AREA_USE_CASE`) e `index [1]` (`RESERVATIONS_REPOSITORY`). |
| **Passo 2** | Criar as instâncias de teste substitutas | Instanciar `const inMemoryRepo = new InMemoryReservationsRepository()`. |
| **Passo 3** | Registrar providers customizados | Fornecer `{ provide: RESERVATIONS_REPOSITORY, useValue: inMemoryRepo }`. |
| **Passo 4** | Configurar useFactory para orquestração | Instanciar o caso de uso injetando os tokens fornecidos: `useFactory: (repo, elig) => new ReserveCommonAreaUseCase(repo, elig)`. |
| **Passo 5** | Validar compilação isolada | Reexecutar a suíte comprovando compilação limpa do `TestingModule`. |
