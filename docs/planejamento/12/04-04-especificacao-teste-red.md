# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC12 — Realizar votacao em assembleia
**Issue:** [#14](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/14)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/12/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar voto de morador adimplente em pauta de assembleia virtual aberta, computando a escolha e garantindo unicidade do voto por unidade autonoma."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/assemblies/use-cases/cast-assembly-vote.use-case.spec.ts`

```typescript
import { CastAssemblyVoteUseCase } from './cast-assembly-vote.use-case.js';
import { InMemoryAssemblyRepository } from '../repositories/in-memory-assembly.repository.js';

describe('CastAssemblyVoteUseCase', () => {
  it('casts vote on an open assembly item and prevents duplicate voting', async () => {
    // Arrange
    const repository = new InMemoryAssemblyRepository();
    const useCase = new CastAssemblyVoteUseCase(repository);

    // Act
    const voteReceipt = await useCase.execute({
      assemblyId: 'asm-2026',
      agendaItemId: 'agenda-01',
      unitId: 'apt-404',
      option: 'YES',
    });

    // Assert
    expect(voteReceipt.receiptNumber).toBeDefined();
    expect(voteReceipt.recordedAt).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/assemblies/use-cases/cast-assembly-vote.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
