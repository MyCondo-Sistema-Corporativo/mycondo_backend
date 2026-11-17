# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC07 — Abrir ocorrencia
**Issue:** [#9](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/9)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/07/`

---

## 1. Criterio de Aceite Selecionado

> **"Registrar ocorrencia pelo morador com categoria, descricao e unidade, atribuindo protocolo unico e status OPEN."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/occurrences/use-cases/open-occurrence.use-case.spec.ts`

```typescript
import { OpenOccurrenceUseCase } from './open-occurrence.use-case.js';
import { InMemoryOccurrencesRepository } from '../repositories/in-memory-occurrences.repository.js';

describe('OpenOccurrenceUseCase', () => {
  it('creates an occurrence with protocol and initial open status', async () => {
    // Arrange
    const repository = new InMemoryOccurrencesRepository();
    const useCase = new OpenOccurrenceUseCase(repository);

    // Act
    const occurrence = await useCase.execute({
      residentId: 'res-303',
      unitId: 'apt-303',
      category: 'NOISE',
      description: 'Barulho excessivo apos as 22h no bloco B',
    });

    // Assert
    expect(occurrence.protocol).toBeDefined();
    expect(occurrence.status).toBe('OPEN');
    expect(occurrence.category).toBe('NOISE');
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/occurrences/use-cases/open-occurrence.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
