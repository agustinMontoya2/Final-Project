import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/add-category.dto';
import * as data from '../utils/Archivo.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async preloadCategories() {
    for (const element of data) {
      console.log('preloading categories...');
      console.log(element);

      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({
          category_name: element.category,
        })
        .orIgnore()
        .execute();
    }
    const categories = await this.categoriesRepository.find();
    console.log(categories);

    return 'Categories loaded';
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async createCategory(addCategoryDto: AddCategoryDto) {}
}
