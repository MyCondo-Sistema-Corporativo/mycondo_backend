# 07-06 — Testes Automatizados da Fronteira HTTP

**UC:** UC01 — Solicitar reserva de area comum
**Issue:** [#1](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/1)
**Sub-Issue:** SUB-04 — Fronteira HTTP REST
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/01/`

---

## 1. Especificacao e Implementacao dos Testes da Fronteira (Refinamento 3)

Arquivo implementado em `src/modules/reservations/http/reservations.controller.spec.ts` utilizando Vitest com mocks do caso de uso e repositorio:

```typescript
describe('ReservationsController (HTTP Boundary)', () => {
  it('Teste 1 — delegar com sucesso ao caso de uso com dados validos e retornar representacao estruturada', async () => {
    // Arrange & Act
    const response = await controller.create(dto);
    // Assert
    expect(reserveCommonAreaMock.execute).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(ReservationStatus.PENDING);
  });

  it('Teste 2 — rejeitar entrada invalida na fronteira HTTP sem invocar o servico de aplicacao', async () => {
    // Act & Assert
    await expect(controller.create(invalidDto)).rejects.toThrow(BadRequestException);
    expect(reserveCommonAreaMock.execute).not.toHaveBeenCalled();
  });
});
```

---

## 2. Evidencias Reais de Execucao no Terminal

### 2.1. Execucao Isolada do Teste HTTP
**Comando:** `pnpm vitest run src/modules/reservations/http/reservations.controller.spec.ts`
```text
 ✓ src/modules/reservations/http/reservations.controller.spec.ts (2 tests) 14ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Duration  3.18s
```

### 2.2. Suite Completa do Projeto (Verificacao de Regressao)
**Comando:** `pnpm test`
```text
 ✓ src/modules/reservations/value-objects/reservation-period.spec.ts (2 tests) 18ms
 ✓ src/modules/reservations/use-cases/reserve-common-area.use-case.spec.ts (4 tests) 18ms
 ✓ src/modules/reservations/http/reservations.controller.spec.ts (2 tests) 16ms
 ✓ src/app.controller.spec.ts (1 test) 2722ms

 Test Files  4 passed (4)
      Tests  9 passed (9)
   Duration  5.78s
```

**Resultado:** 100% dos testes aprovados, sem qualquer regressao nas camadas de dominio ou aplicacao.
