import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/Archivo.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async preloadCategories() {
    for (const element of data) {
        const existingCategory = await this.categoriesRepository.findOneBy({
            category_name: element.category
        });

        let category: Category;

        if (existingCategory) {
            category = existingCategory;
        } else {
            category = this.categoriesRepository.create({
                category_name: element.category
            });
        }

        await this.categoriesRepository.save(category);

        console.log('preloading categories...');
        console.log(element);
    }

    return 'Categories loaded';
}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

}
