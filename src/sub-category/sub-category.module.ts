import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  providers:[SubCategoryService],
  controllers: [SubCategoryController]
})
export class SubCategoryModule {}
