# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC06 — Autorizar e registrar acesso
**Issue:** [#8](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/8)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/06/`

---

## 1. Criterio de Aceite Selecionado

> **"Autorizar e protocolar entrada de visitante ou prestador pre-cadastrado na portaria, conferindo validade do QR code ou documento e registrando log com data/hora."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/access-control/use-cases/authorize-access.use-case.spec.ts`

```typescript
import { AuthorizeAccessUseCase } from './authorize-access.use-case.js';
import { InMemoryAccessLogRepository } from '../repositories/in-memory-access-log.repository.js';

describe('AuthorizeAccessUseCase', () => {
  it('authorizes entry for pre-registered visitor with valid access pass', async () => {
    // Arrange
    const repository = new InMemoryAccessLogRepository();
    const useCase = new AuthorizeAccessUseCase(repository);

    // Act
    const log = await useCase.execute({
      visitorDocument: '98765432100',
      visitorName: 'Carlos Silva',
      unitId: 'apt-202',
      entryGate: 'Portaria Principal',
      authorizedBy: 'resident-2',
    });

    // Assert
    expect(log.accessGranted).toBe(true);
    expect(log.timestamp).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/access-control/use-cases/authorize-access.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
