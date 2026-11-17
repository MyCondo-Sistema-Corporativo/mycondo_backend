# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC10 — Registrar e conciliar pagamento
**Issue:** [#12](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/12)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/10/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar liquidacao de cobranca bancaria via webhook ou retorno de arquivo CNAB, conciliando a fatura e baixando o titulo financeiro com status RECONCILED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/finance/use-cases/reconcile-payment.use-case.spec.ts`

```typescript
import { ReconcilePaymentUseCase } from './reconcile-payment.use-case.js';
import { InMemoryFinanceRepository } from '../repositories/in-memory-finance.repository.js';

describe('ReconcilePaymentUseCase', () => {
  it('reconciles payment and marks invoice as settled', async () => {
    // Arrange
    const repository = new InMemoryFinanceRepository();
    const useCase = new ReconcilePaymentUseCase(repository);

    // Act
    const transaction = await useCase.execute({
      invoiceId: 'inv-505',
      paymentMethod: 'PIX',
      paidAmount: 350.00,
      settlementDate: new Date('2026-11-17T12:00:00.000Z'),
    });

    // Assert
    expect(transaction.status).toBe('RECONCILED');
    expect(transaction.settledAmount).toBe(350.00);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/finance/use-cases/reconcile-payment.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
