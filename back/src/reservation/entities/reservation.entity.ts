import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Table } from './table.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  reservation_id: string;

  @ManyToOne(() => Table, (table) => table.reservations)
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  status: string;
}
