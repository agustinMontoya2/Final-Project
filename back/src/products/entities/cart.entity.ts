import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
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
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => ProductDetail, (product) => product.carts)
  @JoinTable({
    name: 'cart_products', // Nombre de la tabla intermedia
    joinColumn: {
      name: 'cart_id', // Nombre de la columna en la tabla intermedia que hace referencia a Cart
      referencedColumnName: 'cart_id',
    },
    inverseJoinColumn: {
      name: 'product_detail_id', // Nombre de la columna que hace referencia a Product
      referencedColumnName: 'product_detail_id',
    },
  })
  productDetail: ProductDetail[];

  @Column({ default: '' })
  note: string;
}
