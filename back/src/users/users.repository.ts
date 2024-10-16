import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/create-user.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Favorities)
    private favoritiesRepository: Repository<Favorities>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(user_id: string) {
    const user = await this.userRepository.findOne({
      where: { user_id },
    });
    return user ? user : null;
  }

  async createUser(signUpDto: SignUpDto) {
    console.log('creating user...');

    const user = await this.userRepository.create(signUpDto);
    const cart = new Cart();
    const favorities = new Favorities();

    const savedCart = await this.cartRepository.save(cart);
    const savedFavorities = await this.favoritiesRepository.save(favorities);

    user.cart = savedCart;
    user.favorities = savedFavorities;
    const savedUser = await this.userRepository.save(user);

    cart.user = savedUser;
    favorities.user = savedUser;
    await this.cartRepository.save(cart);
    await this.favoritiesRepository.save(favorities);

    return savedUser.user_id;
  }

  async updateUser(user_id: string, updateUserDto: any) {
    await this.userRepository.update(user_id, updateUserDto);
    const user = await this.getUserById(user_id);
    return user;
  }

  async addToCart(productDetail: productDetailDto, cart: User['cart']) {
    const { product_id, quantity, note } = productDetail;
    const product = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!product || product.available === false)
      throw new NotFoundException('Product not found or not available');

    const productDetailEntity = new ProductDetail();
    productDetailEntity.note = note;
    productDetailEntity.quantity = quantity;
    productDetailEntity.subtotal = product.price * quantity;
    productDetailEntity.product = product;
    cart.productDetail.push(productDetailEntity);
    await this.productDetailRepository.save(productDetailEntity);
  }
}
