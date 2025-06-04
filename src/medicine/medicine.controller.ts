import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { CreateMedicineDto } from './medicine.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateMedicineDto) {
    return this.medicineService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.medicineService.findAll();
  }
}
