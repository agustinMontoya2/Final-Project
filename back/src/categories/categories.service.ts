import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';

@Injectable()
export class CategoriesService {
  create(addCategoryDto: AddCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
