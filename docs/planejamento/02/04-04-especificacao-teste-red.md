# 04-04 — Especificacao do Primeiro Teste RED

**UC:** UC02 — Confirmar reserva mediante pagamento ou aprovacao
**Issue:** [#4](https://github.com/MyCondo-Sistema-Corporativo/mycondo_backend/issues/4)
**Data:** 17 de novembro de 2026
**Diretorio:** `docs/planejamento/02/`

---

## 1. Criterio de Aceite Selecionado

> **"Confirmar reserva pendente mediante recebimento de comprovacao de pagamento ou aprovacao de gestor, transicionando o status para CONFIRMED e registrando data de atualizacao."**

- **Nivel do Teste:** Teste Unitario de Caso de Uso (Camada de Aplicacao / Dominio).
- **Justificativa Tecnica:** O teste unitario com dubles de teste em memoria isola a regra negocial pura sem depender de banco de dados, rede ou integracoes externas, propiciando feedback rapido e deterministico.

---

## 2. Estrutura AAA (Arrange, Act, Assert)

- **Arrange (Preparacao):** Instanciacao dos repositorios em memoria e dados validos para a operacao.
- **Act (Acao):** Invocacao do caso de uso com o payload do comando.
- **Assert (Verificacao):** Confirmacao de que a entidade de dominio atinge o estado esperado e cumpre os invariantes de negocio.

---

## 3. Codigo-Fonte do Teste Automatizado Planejado

**Arquivo de Destino:** `src/modules/reservations/use-cases/confirm-reservation.use-case.spec.ts`

```typescript
import { ReservationStatus } from '../../../common/enum/reservation-status.enum.js';
import { ConfirmReservationUseCase } from './confirm-reservation.use-case.js';
import { InMemoryReservationsRepository } from '../repositories/in-memory-reservations.repository.js';
import { Reservation } from '../entities/reservation.entity.js';
import { ReservationPeriod } from '../value-objects/reservation-period.js';

describe('ConfirmReservationUseCase', () => {
  it('confirms a pending reservation when payment is approved', async () => {
    // Arrange
    const repository = new InMemoryReservationsRepository();
    const period = new ReservationPeriod(
      new Date('2026-12-10T18:00:00.000Z'),
      new Date('2026-12-10T22:00:00.000Z'),
    );
    const reservation = new Reservation(
      'res-123',
      'resident-1',
      'party-room-1',
      period,
      ReservationStatus.PENDING,
    );
    await repository.save(reservation);

    const useCase = new ConfirmReservationUseCase(repository);

    // Act
    const confirmed = await useCase.execute({
      reservationId: 'res-123',
      paymentId: 'pay-999',
    });

    // Assert
    expect(confirmed.currentStatus).toBe(ReservationStatus.CONFIRMED);
    expect(confirmed.updatedAt).toBeInstanceOf(Date);
  });
});
```

---

## 4. Dependencias Tecnicas e Comando de Execucao

- **Contratos Minimos Necessarios:** Interface de repositorio e caso de uso a serem criados.
- **Comando de Execucao:**
  ```bash
  pnpm vitest run src/modules/reservations/use-cases/confirm-reservation.use-case.spec.ts
  ```

> ⚠️ **RESTRICAO CAPITAL DO TDD:** Este teste deve ser introduzido sem a implementacao que o faz passar. A atividade termina rigorosamente na fase RED do TDD.
