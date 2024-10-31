import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductDetail } from './productDetail.entity';

@Entity()
export class Favorities {
  @PrimaryGeneratedColumn('uuid')
  favorities_id: string;

  @OneToOne(() => User, (user) => user.favorities)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Product, (product) => product.favorities)
  @JoinTable({
    name: 'favorities_products', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'favorities_id', // Columna en la tabla intermedia que refiere a Favorities
      referencedColumnName: 'favorities_id',
    },
    inverseJoinColumn: {
      name: 'productid', // Columna que refiere a Product
      referencedColumnName: 'product_id',
    },
  })
  product: Product[];
}
