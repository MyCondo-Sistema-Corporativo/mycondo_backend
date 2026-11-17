# Artefato 08-03: Verificação de Módulos, Providers e Resolução de Dependências
**Caso de Uso:** UC01 — Reservar Área Comum  
**Módulo:** `ReservationsModule`  
**Data:** 17/11/2026  

---

## 1. Mapeamento de Tokens e Árvore de Dependências

O NestJS resolve as dependências do módulo de reservas por meio de tokens de injeção desacoplados de classes concretas:

```
[ReservationsController]
       │
       ├── @Inject(RESERVE_COMMON_AREA_USE_CASE) ────────┐
       │                                                 ▼
       │                                      [ReserveCommonAreaUseCase]
       │                                                 │
       │                                                 ├── @Inject(RESERVATIONS_REPOSITORY)
       │                                                 │         │
       │                                                 │         ▼
       │                                                 │   [InMemoryReservationsRepository]
       │                                                 │
       │                                                 └── @Inject(RESIDENT_ELIGIBILITY_SERVICE)
       │                                                           │
       │                                                           ▼
       │                                                     [Mock / In-Memory Eligibility]
       │
       └── @Inject(RESERVATIONS_REPOSITORY) ───────────────────────┘
```

---

## 2. Aplicação do Dependency Inversion Principle (DIP)

A inversão de dependência é viabilizada pelo uso de interfaces do TypeScript e tokens explícitos:
- O `ReserveCommonAreaUseCase` não conhece o TypeORM nem o PostgreSQL; ele depende apenas do contrato `IReservationsRepository`.
- No ambiente de testes integrados, o provider sob o token `RESERVATIONS_REPOSITORY` fornece a instância do `InMemoryReservationsRepository`.
- No ambiente de produção, o mesmo token recebe a instância de `TypeOrmReservationsRepository` via fábrica no `ReservationsModule`.
- **Impacto:** Zero modificações no código da aplicação ou no Controller para alternar entre persistência volátil e banco de dados relacional.

---

## 3. Configuração do Módulo de Testes Isolados

A suíte de testes integrados instancia o módulo de teste através de `Test.createTestingModule`:

```typescript
const moduleRef: TestingModule = await Test.createTestingModule({
  controllers: [ReservationsController],
  providers: [
    {
      provide: RESERVATIONS_REPOSITORY,
      useValue: inMemoryRepo,
    },
    {
      provide: RESIDENT_ELIGIBILITY_SERVICE,
      useValue: eligibilityService,
    },
    {
      provide: RESERVE_COMMON_AREA_USE_CASE,
      useFactory: (repo, elig) => new ReserveCommonAreaUseCase(repo, elig),
      inject: [RESERVATIONS_REPOSITORY, RESIDENT_ELIGIBILITY_SERVICE],
    },
  ],
}).compile();
```
