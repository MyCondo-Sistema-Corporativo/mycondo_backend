import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  reservationId!: string;

  @Column({ type: 'varchar', length: 100 })
  residentId!: string;

  @Column({ type: 'varchar', length: 100 })
  commonAreaId!: string;

  @Column({ type: 'timestamptz' })
  startsAt!: Date;

  @Column({ type: 'timestamptz' })
  endsAt!: Date;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled'] })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @Column({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ type: 'timestamptz' })
  updatedAt!: Date;
}
