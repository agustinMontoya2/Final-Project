import {
  Controller,
  Get,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('categories')
@ApiTags('Categories')
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
