import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from 'src/products/entities/product.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string = uuid();

  @Column({ type: 'varchar', length: 50 })
  category_name: string;

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];
}
