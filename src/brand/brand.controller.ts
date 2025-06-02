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
import { BrandService } from './brand.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { createBrandDto } from './brand.dto';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: createBrandDto) {
    return this.brandService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.brandService.findAll();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: createBrandDto) {
    return this.brandService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
