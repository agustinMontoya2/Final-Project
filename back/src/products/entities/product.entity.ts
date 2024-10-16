import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Favorities } from './favorities.entity';
import { Cart } from './cart.entity';

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

  @Column({ type: 'text' })
  image_url: string;

  // Relación ManyToOne con Category
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  available: boolean;

  //   @ManyToOne(() => ProductDetail, (productDetail) => productDetail.product)
  //   @JoinColumn({ name: 'product_detail_id' })
  //   product_detail: ProductDetail;
  @ManyToMany(() => Cart, (cart) => cart.products)
  carts: Cart[];

  // Relación ManyToMany con Favorities
  @ManyToMany(() => Favorities, (favorities) => favorities.products)
  favorities: Favorities[];
}
