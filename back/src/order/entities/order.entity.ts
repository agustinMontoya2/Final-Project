import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column()
  date: Date;

  @Column({ default: 'pending' })
  state: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'orderDetail_id' })
  orderDetail: OrderDetail;
}

/**
 * order
 * 
id: 324234
date
user
orderDetail_id: 6664545
 
 */
