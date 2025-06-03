import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SubCategoryService } from './sub-category.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { createSubCategoryDto, updateSubCategoryDto } from './sub-category.dto';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sub-category')
export class SubCategoryController {
  constructor(private SubCatService: SubCategoryService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: createSubCategoryDto) {
    return this.SubCatService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.SubCatService.findAll();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: updateSubCategoryDto) {
    return this.SubCatService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.SubCatService.delete(id);
  }
}
