import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('review')
@Unique(['product', 'user'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  review_id: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  review: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rate: number;
}
