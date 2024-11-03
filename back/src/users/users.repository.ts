import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/create-user.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductDetail } from 'src/products/entities/productDetail.entity';
import { isUUID } from 'class-validator';
import { error } from 'console';
import { Credential } from 'src/auth/entities/credential.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Favorities)
    private readonly favoritiesRepository: Repository<Favorities>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find({
      relations: ['credential'],
    });
    return users.map(
      ({ credential: { password, ...userWithoutPassword }, ...user }) => ({
        ...user,
        credential: userWithoutPassword, // solo sin la contraseña
      }),
    );
  }

  async getUserById(user_id) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ['cart', 'favorities', 'reservations'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(signUpDto: SignUpDto) {
    console.log('creating user...');

    const user = await this.userRepository.create(signUpDto);
    const userCart = new Cart();
    const userFavorities = new Favorities();

    const savedCart = await this.cartRepository.save(userCart);
    const savedFavorities =
      await this.favoritiesRepository.save(userFavorities);

    user.cart = savedCart;
    user.favorities = savedFavorities;
    const savedUser = await this.userRepository.save(user);

    userCart.user = savedUser;
    userFavorities.user = savedUser;
    await this.cartRepository.save(userCart);
    await this.favoritiesRepository.save(userFavorities);

    const { cart, favorities, ...userWithoutRelations } = savedUser;
    return userWithoutRelations;
  }

  async createAuth0User(data) {
    const user = await this.userRepository.save(data);
    const userCart = new Cart();
    const userFavorities = new Favorities();

    const savedCart = await this.cartRepository.save(userCart);
    const savedFavorities =
      await this.favoritiesRepository.save(userFavorities);

    user.cart = savedCart;
    user.favorities = savedFavorities;
    const savedUser = await this.userRepository.save(user);

    userCart.user = savedUser;
    userFavorities.user = savedUser;
    await this.cartRepository.save(userCart);
    await this.favoritiesRepository.save(userFavorities);
    return user;
  }

  async updateUser(user_id: string, updateUserDto: any) {
    const { name, email, address, phone } = updateUserDto;
    const user = await this.userRepository.findOneBy({ user_id });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.update(user_id, { name, address, phone });
    const { isAdmin, ...userWithoutRelations } = user;
    return userWithoutRelations;
  }

  async addToCart(productDetail: productDetailDto, user: User) {
    const cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['productDetail', 'productDetail.product'],
    });
    if (!cart) throw new NotFoundException('Cart not found');

    const { product_id, quantity } = productDetail;
    const product = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!product || product.available === false)
      throw new NotFoundException('Product not found or not available');

    const productDetailInCart = cart.productDetail.find(
      (productDetail) => productDetail.product.product_id === product_id,
    );
    if (productDetailInCart) {
      const newQuantity =
        Number(quantity) + Number(productDetailInCart.quantity);
      productDetailInCart.quantity = newQuantity;
      const newSubtotal = Number(product.price) * newQuantity;
      productDetailInCart.subtotal = newSubtotal;

      await this.productDetailRepository.save(productDetailInCart);
    } else {
      const productDetailEntity = new ProductDetail();
      productDetailEntity.quantity = quantity;
      productDetailEntity.subtotal = Number(product.price) * Number(quantity);
      productDetailEntity.product = product;
      console.log(productDetailEntity);

      cart.productDetail.push(productDetailEntity);
      console.log(quantity);
      await this.productDetailRepository.save(productDetailEntity);
    }
    await this.cartRepository.save(cart);

    const userCart = await this.cartRepository.findOne({
      where: { user },
      relations: ['productDetail'],
    });
    return userCart;
  }

  async addToFavoritiesRepository(product_id: string, user: User) {
    const favorities = await this.favoritiesRepository.findOne({
      where: { user },
      relations: ['product'],
    });
    if (!favorities) throw new NotFoundException('Favorities not found');
    const product = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!product) throw new NotFoundException('Product not found');
    favorities.product.push(product);
    console.log(favorities);
    console.log(favorities.product);

    await this.favoritiesRepository.save(favorities);

    const userFavorities = await this.favoritiesRepository.findOne({
      where: { user },
      relations: ['product'],
    });
    return userFavorities;
  }

  async getUserFavoritiesRepository(user: User) {
    const favorities = await this.favoritiesRepository.findOne({
      where: { user },
      relations: ['product'],
    });
    if (!favorities) throw new NotFoundException('Favorities not found');
    return favorities;
  }

  getCart(user: User) {
    const cart = this.cartRepository.findOne({
      where: { user },
      relations: ['productDetail', 'productDetail.product'],
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async removeOneQuantityCart(product_detail_id: string) {
    const productDetail = await this.productDetailRepository.findOne({
      where: { product_detail_id },
      relations: ['product'],
    });
    if (!productDetail) throw new NotFoundException('Product Detail not found');
    if (productDetail.quantity > 1) {
      productDetail.quantity -= 1;
      productDetail.subtotal -= Number(productDetail.product.price);
      await this.productDetailRepository.save(productDetail);
      return { message: 'quantity decreased' };
    } else {
      throw new BadRequestException('Quantity cannot be less than 1');
      return { message: 'Product removed from cart successfully' };
    }
  }

  async removeOneProductCart(product_detail_id: string) {
    const productDetail = await this.productDetailRepository.findOne({
      where: { product_detail_id },
      relations: ['product'],
    });
    if (!productDetail) throw new NotFoundException('Product Detail not found');
    await this.productDetailRepository.remove(productDetail);
    return { message: 'Product removed from cart successfully' };
  }

  async removeAllCart(user: User) {
    const cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['productDetail'],
    });
    if (!cart) throw new NotFoundException('Cart not found');
    cart.productDetail = [];
    cart.note = '';
    await this.cartRepository.save(cart);
    return { message: 'All products removed from cart successfully' };
  }

  async removeFavorities(product_id: string, user: User) {
    const favorities = await this.favoritiesRepository.findOne({
      where: { user },
      relations: ['product'],
    });
    if (!favorities) throw new NotFoundException('Favorities not found');
    const product = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!product) throw new NotFoundException('Product not found');
    favorities.product = favorities.product.filter(
      (product) => product.product_id !== product_id,
    );
    await this.favoritiesRepository.save(favorities);
    return { message: 'Product removed from favorities successfully' };
  }

  async banUser(user) {
    user.isBanned = !user.isBanned;
    if (user.isBanned) {
      user.isAdmin = false;
    }

    await this.userRepository.save(user);
    return user.isBanned
      ? { message: 'User banned successfully' }
      : { message: 'User unbanned successfully' };
  }

  async adminUser(user) {
    user.isAdmin = !user.isAdmin;
    if (user.isBanned) throw new BadRequestException('User is banned');
    await this.userRepository.save(user);
    return user.isAdmin
      ? { message: 'User admin successfully' }
      : { message: 'User unadmin successfully' };
  }

  async getEmailByUser(user_id: string) {
    const findUser = await this.credentialRepository.findOne({
      where: { user: { user_id } },
      relations: ['user'],
    });

    if (!findUser) throw new NotFoundException('user not found');

    return findUser.email;
  }
}
