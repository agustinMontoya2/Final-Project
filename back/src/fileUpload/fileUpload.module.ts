import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './fileUpload.service';
import { FileUploadRepository } from './fileUpload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository, CloudinaryConfig],
})
export class FileUploadModule {}
