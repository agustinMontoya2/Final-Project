import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity({ name: 'tables' })
export class TableReservation {
  @PrimaryGeneratedColumn('uuid')
  table_id: string;

  @Column()
  table_number: number;

  @Column()
  ubication: string;

  @ManyToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
