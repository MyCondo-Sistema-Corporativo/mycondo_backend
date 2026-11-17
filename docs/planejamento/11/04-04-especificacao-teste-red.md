# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC11 — Publicar comunicado
**Issue:** [#13](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/13)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/11/`

---

## 1. Criterio de Aceite Selecionado

> **"Criar e publicar comunicado oficial para todo o condominio ou bloco especifico com titulo, conteudo e nivel de urgencia, com status PUBLISHED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/communications/use-cases/publish-announcement.use-case.spec.ts`

```typescript
import { PublishAnnouncementUseCase } from './publish-announcement.use-case.js';
import { InMemoryAnnouncementsRepository } from '../repositories/in-memory-announcements.repository.js';

describe('PublishAnnouncementUseCase', () => {
  it('publishes official announcement to all residents', async () => {
    // Arrange
    const repository = new InMemoryAnnouncementsRepository();
    const useCase = new PublishAnnouncementUseCase(repository);

    // Act
    const announcement = await useCase.execute({
      title: 'Manutencao preventiva da caixa dagua',
      content: 'Havera interrupcao temporaria do fornecimento no dia 25/11.',
      urgency: 'HIGH',
      authorId: 'trustee-1',
    });

    // Assert
    expect(announcement.id).toBeDefined();
    expect(announcement.status).toBe('PUBLISHED');
    expect(announcement.publishedAt).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/communications/use-cases/publish-announcement.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
