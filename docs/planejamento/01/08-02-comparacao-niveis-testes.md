# Artefato 08-02: Comparação entre Níveis de Testes
**Caso de Uso:** UC01 — Reservar Área Comum  
**Projeto:** MyCondo Backend  
**Data:** 17/11/2026  

---

## 1. Definição dos Quatro Níveis de Testes

| Nível de Teste | Escopo de Execução | Componentes Envolvidos | Estratégia de Isolamento |
| :--- | :--- | :--- | :--- |
| **1. Unitário de Domínio** | Regras de negócio puras e invariantes | `ReservationPeriod`, `Reservation` | Zero dependências externas; sem I/O; execução em memória RAM direta |
| **2. Unitário de Controller** | Borda HTTP, DTOs e tradução de erros | `ReservationsController` | Mocks para `ReserveCommonAreaUseCase` e `IReservationsRepository` |
| **3. Integrado de Backend** | Fluxo HTTP até Persistência em Memória | `HTTP -> Controller -> UseCase -> InMemoryRepo` | Sem mocks de serviço nem repositório; NestJS isolado via Supertest |
| **4. End-to-End (E2E)** | Sistema completo com persistência real | `HTTP -> NestJS -> TypeORM -> PostgreSQL Real` | Banco de dados real em contêiner; transações e migrações executadas |

---

## 2. Matriz Comparativa de Características Técnicas

| Critério de Avaliação | Unitário de Domínio | Unitário de Controller | Integrado de Backend (InMemory) | E2E com Banco Real |
| :--- | :--- | :--- | :--- | :--- |
| **Velocidade de Execução** | Ultrarrápida (~1-5 ms) | Muito rápida (~10-20 ms) | Rápida (~50-100 ms) | Lenta (~1000-5000 ms) |
| **Custo de Manutenção** | Baixíssimo | Baixo | Moderado | Alto |
| **Risco de Fragilidade (Flakiness)** | Nulo | Nulo | Muito baixo | Moderado a Alto (rede/banco) |
| **Fidelidade Arquitetural** | Focado na lógica pura | Focado em rotas/códigos | Alto (valida DI e orquestração) | Máximo (valida SQL e locks) |
| **Dependência de Infraestrutura** | Nenhuma | Nenhuma | Nenhuma (Node.js nativo) | Docker / PostgreSQL / Migrations |

---

## 3. Justificativa Estratégica do Nível Integrado no Material 08
O teste integrado de backend implementado neste material representa o "ponto de equilíbrio ideal" (sweet spot) para o ciclo de desenvolvimento:
- Permite feedback imediato no pipeline de testes (`vitest run` em menos de 4 segundos);
- Valida o funcionamento real do Container de Injeção de Dependências do NestJS;
- Comprova que os dados trafegam desde o body JSON da requisição até a estrutura interna de dados sem perdas ou incompatibilidades de tipo.
