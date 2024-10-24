import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';
import toStream = require('buffer-to-stream');
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class FileUploadRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ product_id: id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    try {
      const value: Promise<UploadApiResponse> = new Promise(
        (resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => (error ? reject(error) : resolve(result)),
          );
          toStream(file.buffer).pipe(upload);
        },
      );

      await this.productsRepository.update(
        { product_id: id },
        { image_url: (await value).secure_url },
      );
      return await value;

      return this.productsRepository.findOneBy({ product_id: id });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`File upload error: ${error.message}`);
    }
  }


  async uploadImageProfileRepository(user_id: string, file: Express.Multer.File) {

    if(!isUUID) {
      throw new BadRequestException('user_id is not UUID')
    }

    const user = await this.userRepository.findOneBy({user_id})

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const value: Promise<UploadApiResponse> = new Promise(
      (resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => (error ? reject(error) : resolve(result)),
        );
        toStream(file.buffer).pipe(upload);
      },
    );

    user.user_img = (await value).secure_url;
    await this.userRepository.save(user);
  
    return {message: 'image upload successfully'}


  }
}
