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
        // Verifica si la categoría ya existe por su nombre
        const existingCategory = await this.categoriesRepository.findOneBy({
            category_name: element.category
        });

        // Si ya existe, no la vuelvas a guardar
        if (existingCategory) {
            console.log('Category already exists:', existingCategory.category_name);
            continue; // Saltar a la siguiente categoría
        }

        // Crear nueva categoría si no existe
        const newCategory = new Category()
        newCategory.category_name = element.category

        await this.categoriesRepository.save(newCategory);

        console.log('Category created:', newCategory);
    }
//

    return 'Categories loaded';
}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

}
