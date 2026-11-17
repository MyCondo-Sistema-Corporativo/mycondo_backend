# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC03 — Cancelar reserva
**Issue:** [#5](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/5)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/03/`

---

## 1. Criterio de Aceite Selecionado

> **"Cancelar reserva ativa (PENDING ou CONFIRMED) mediante solicitacao do titular ou sindico com motivo informado, transicionando status para CANCELLED."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/reservations/use-cases/cancel-reservation.use-case.spec.ts`

```typescript
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { CancelReservationUseCase } from './cancel-reservation.use-case.js';
import { InMemoryReservationsRepository } from '../repositories/in-memory-reservations.repository.js';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

describe('CancelReservationUseCase', () => {
  it('cancels an active reservation with a valid reason', async () => {
    // Arrange
    const repository = new InMemoryReservationsRepository();
    const period = new ReservationPeriod(
      new Date('2026-12-10T18:00:00.000Z'),
      new Date('2026-12-10T22:00:00.000Z'),
    );
    const reservation = new Reservation(
      'res-200',
      'resident-1',
      'party-room-1',
      period,
      ReservationStatus.CONFIRMED,
    );
    await repository.save(reservation);

    const useCase = new CancelReservationUseCase(repository);

    // Act
    const result = await useCase.execute({
      reservationId: 'res-200',
      reason: 'Imprevisto familiar',
      requestedBy: 'resident-1',
    });

    // Assert
    expect(result.currentStatus).toBe(ReservationStatus.CANCELLED);
    expect(result.isActive()).toBe(false);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/reservations/use-cases/cancel-reservation.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
