import { ApiHideProperty } from '@nestjs/swagger';
import { Credential } from 'src/auth/entities/credential.entity';
import { Order } from 'src/order/entities/order.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @OneToOne(() => Credential, (credential) => credential.user, {
    onDelete: 'CASCADE',
  })
  credential: Credential;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  //@JoinColumn({ name: 'reservation_id' })
  reservations: Reservation[];

  @Column({ type: 'boolean', default: false })
  @ApiHideProperty()
  isAdmin: boolean;
}
