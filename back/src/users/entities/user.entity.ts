import { ApiHideProperty } from '@nestjs/swagger';
import { isEmpty } from 'class-validator';
import { Credential } from 'src/auth/entities/credential.entity';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';
import { Review } from 'src/products/entities/review.entity';
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

  @Column({ nullable: true })
  user_img: string;

  @Column()
  phone: string;

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

  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @OneToOne(() => Favorities, (favorities) => favorities.user)
  @JoinColumn({ name: 'favorities_id' })
  favorities: Favorities;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column({ default: 'local' })
  provider: string;
}
