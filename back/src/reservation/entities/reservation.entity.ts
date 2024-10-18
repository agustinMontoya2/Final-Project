import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableReservation } from './table.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  reservation_id: string;

  @ManyToMany(() => TableReservation, (table) => table.reservations, {
    cascade: true,
  })
  @JoinTable({
    name: 'reservation_tables', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'reservation_id', // Nombre de la columna en la tabla intermedia que hará referencia a Reservation
      referencedColumnName: 'reservation_id', // Nombre de la columna de la entidad Reservation
    },
    inverseJoinColumn: {
      name: 'table_id', // Nombre de la columna en la tabla intermedia que hará referencia a TableReservation
      referencedColumnName: 'table_id', // Nombre de la columna de la entidad TableReservation
    },
  })
  table: TableReservation[];

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  date: Date;

  @Column()
  peopleCount: number;

  @Column()
  time: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  timeEnd: string;
}
