import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({ name: 'table' })
export class TableReservation {
  @PrimaryGeneratedColumn('uuid')
  table_id: string;

  @Column()
  table_number: number;

  @Column()
  capacity: number;

  @Column()
  status: string;

  @Column()
  ubication: string;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
