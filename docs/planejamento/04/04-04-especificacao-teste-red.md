# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC04 — Registrar recebimento de encomenda
**Issue:** [#6](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/6)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/04/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar recebimento de pacote na portaria com codigo de rastreio, unidade de destino e transportadora, gerando protocolo em estado PENDING_PICKUP."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/deliveries/use-cases/receive-package.use-case.spec.ts`

```typescript
import { ReceivePackageUseCase } from './receive-package.use-case.js';
import { InMemoryDeliveriesRepository } from '../repositories/in-memory-deliveries.repository.js';

describe('ReceivePackageUseCase', () => {
  it('registers a received package and puts it in custody', async () => {
    // Arrange
    const repository = new InMemoryDeliveriesRepository();
    const useCase = new ReceivePackageUseCase(repository);

    // Act
    const pkg = await useCase.execute({
      trackingCode: 'BR123456789',
      carrier: 'Correios',
      unitId: 'apt-101',
      recipientName: 'Vinicius Nunes',
      operatorId: 'doorman-1',
    });

    // Assert
    expect(pkg.id).toBeDefined();
    expect(pkg.status).toBe('PENDING_PICKUP');
    expect(pkg.trackingCode).toBe('BR123456789');
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/deliveries/use-cases/receive-package.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
