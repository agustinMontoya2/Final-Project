import { Injectable } from '@nestjs/common';
// import { AddCategoryDto } from './dto/add-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  preload() {
    return this.categoriesRepository.preloadCategories();
  }
  // create(addCategoryDto: AddCategoryDto) {
  //   return 'This action adds a new category';
  // }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
