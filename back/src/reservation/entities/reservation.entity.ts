import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableReservation } from './table.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  reservation_id: string;

  @ManyToOne(() => TableReservation, (table) => table.reservations)
  @JoinColumn({ name: 'table_id' })
  table: TableReservation;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  status: boolean;
}
