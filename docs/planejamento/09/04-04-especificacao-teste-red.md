# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC09 — Executar ordem de servico
**Issue:** [#11](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/11)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/09/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar inicio e conclusao de servico tecnico pelo prestador, registrando relatorio de execucao e alterando estado para IN_PROGRESS ou COMPLETED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/work-orders/use-cases/execute-work-order.use-case.spec.ts`

```typescript
import { ExecuteWorkOrderUseCase } from './execute-work-order.use-case.js';
import { InMemoryWorkOrdersRepository } from '../repositories/in-memory-work-orders.repository.js';

describe('ExecuteWorkOrderUseCase', () => {
  it('updates work order status to IN_PROGRESS upon technician check-in', async () => {
    // Arrange
    const repository = new InMemoryWorkOrdersRepository();
    const useCase = new ExecuteWorkOrderUseCase(repository);

    // Act
    const order = await useCase.execute({
      workOrderId: 'wo-101',
      contractorId: 'contractor-5',
      action: 'START',
    });

    // Assert
    expect(order.status).toBe('IN_PROGRESS');
    expect(order.startedAt).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/work-orders/use-cases/execute-work-order.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
