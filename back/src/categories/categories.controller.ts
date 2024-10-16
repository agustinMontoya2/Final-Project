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

  @Get('preload')
  preload() {
    return this.categoriesService.preload();
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
