# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC05 — Entregar encomenda
**Issue:** [#7](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/7)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/05/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar baixa de encomenda em custodia mediante identificacao do morador ou recebedor autorizado com registro de documento/assinatura, assumindo estado DELIVERED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/deliveries/use-cases/deliver-package.use-case.spec.ts`

```typescript
import { DeliverPackageUseCase } from './deliver-package.use-case.js';
import { InMemoryDeliveriesRepository } from '../repositories/in-memory-deliveries.repository.js';

describe('DeliverPackageUseCase', () => {
  it('delivers package to resident with verification evidence', async () => {
    // Arrange
    const repository = new InMemoryDeliveriesRepository();
    const useCase = new DeliverPackageUseCase(repository);

    // Act
    const result = await useCase.execute({
      packageId: 'pkg-001',
      pickedUpBy: 'Vinicius Nunes',
      documentId: '12345678900',
      deliveredBy: 'doorman-1',
    });

    // Assert
    expect(result.status).toBe('DELIVERED');
    expect(result.deliveredAt).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/deliveries/use-cases/deliver-package.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
