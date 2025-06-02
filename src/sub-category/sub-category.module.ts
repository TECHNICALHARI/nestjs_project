import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';

@Module({
  controllers: [SubCategoryController]
})
export class SubCategoryModule {}
