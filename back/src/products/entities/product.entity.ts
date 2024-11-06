import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Favorities } from './favorities.entity';
import { Cart } from './cart.entity';
import { Review } from './review.entity';
import { ProductDetail } from './productDetail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  product_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'text',
    default:
      'https://res.cloudinary.com/dpnhtxzv3/image/upload/v1730847626/yu0eqanztugvb5mmgzah.png',
  })
  image_url: string;

  // Relación ManyToOne con Category
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  available: boolean;

  // Relación ManyToMany con Favorities
  @ManyToMany(() => Favorities, (favorities) => favorities.product)
  favorities: Favorities[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: ProductDetail[];
}
