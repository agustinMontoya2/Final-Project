import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddCategoryDto } from './dto/add-category.dto';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() addCategoryDto: AddCategoryDto) {
    return this.categoriesService.create(addCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Deletes a category by ID.
   * @param id The ID of the category to delete.
   * @returns The deleted category.
/******  82ae0720-1d9b-44de-bb49-a014ed972418  *******/
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
