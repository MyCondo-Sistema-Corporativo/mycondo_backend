# 07-02 — Planejamento da Fronteira HTTP e Estrategia de Branch

**UC:** UC01 — Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Sub-Issue:** SUB-04 — Implementacao da Fronteira HTTP REST
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Estrategia de Branches e Cadeia de Dependencias (Refinamento 2)

O desenvolvimento da camada HTTP no projeto MyCondo conecta-se a cadeia de implementacao:

```text
master
  |
  +-- test/issue-1-uc01-red-periodo-antecedencia (Draft PR #15 - Testes e Implementacao GREEN)
        |
        +-- feat/issue-1-solicitar-reserva (Branch HTTP / Persistencia)
```

- **Branch de Trabalho:** `test/issue-1-uc01-red-periodo-antecedencia`
- **Branch Remota:** `origin/feat/issue-1-solicitar-reserva`
- **Branch-Base de Destino:** `master`
- **Justificativa:** A integracao na branch de trabalho disponibiliza tanto os testes unitarios GREEN quanto a persistencia e o endpoint HTTP de forma coesa e rastreavel.

---

## 2. Matriz de Planejamento Tecnico da Fronteira HTTP

| Componente | Responsabilidade | Arquivo Real | Contrato Associado | Alteracao / Estado |
|---|---|---|---|---|
| **Controller HTTP** | Receber POST /reservas e GET /reservas/:id | `src/modules/reservations/http/reservations.controller.ts` | `ReserveCommonAreaUseCase` | Implementado |
| **DTO de Entrada** | Estruturar payload de reserva | `src/modules/reservations/http/reserve-common-area.dto.ts` | Contrato JSON REST | Implementado |
| **Validacao HTTP** | Validar presenca e formato ISO-8601 | Metodos `parseDate` e `requireText` no Controller | Retorno 400 Bad Request | Implementado |
| **Filtro de Erros** | Capturar excecoes de dominio e traduzir em HTTP | `src/modules/reservations/http/reservations.exception-filter.ts` | 403, 409 e 422 | Implementado |
| **Modulo NestJS** | Declarar controllers, providers e factories | `src/modules/reservations/reservations.module.ts` | Injeção via Tokens | Implementado |
| **Testes HTTP** | Testar delegacao e rejeicao 400 | `src/modules/reservations/http/reservations.controller.spec.ts` | Vitest + Mocks | Implementado e Aprovado |
