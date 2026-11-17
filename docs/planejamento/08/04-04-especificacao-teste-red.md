# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC08 — Aprovar orcamento de ordem de servico
**Issue:** [#10](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/10)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/08/`

---

## 1. Criterio de Aceite Selecionado

> **"Aprovar orcamento de ordem de servico de manutencao predial pelo sindico respeitando o teto financeiro limite, transicionando a OS para BUDGET_APPROVED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/work-orders/use-cases/approve-work-order-budget.use-case.spec.ts`

```typescript
import { ApproveWorkOrderBudgetUseCase } from './approve-work-order-budget.use-case.js';
import { InMemoryWorkOrdersRepository } from '../repositories/in-memory-work-orders.repository.js';

describe('ApproveWorkOrderBudgetUseCase', () => {
  it('approves a maintenance budget within authorization limit', async () => {
    // Arrange
    const repository = new InMemoryWorkOrdersRepository();
    const useCase = new ApproveWorkOrderBudgetUseCase(repository);

    // Act
    const workOrder = await useCase.execute({
      workOrderId: 'wo-101',
      budgetAmount: 2500.00,
      approvedBy: 'trustee-1',
    });

    // Assert
    expect(workOrder.budgetStatus).toBe('APPROVED');
    expect(workOrder.authorizedAmount).toBe(2500.00);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/work-orders/use-cases/approve-work-order-budget.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
