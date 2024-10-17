import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({ name: 'tables' })
export class TableReservation {
  @PrimaryGeneratedColumn('uuid')
  table_id: string;

  @Column()
  table_number: number;

  @Column()
  status: boolean;

  @Column()
  ubication: string;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
