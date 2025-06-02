import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBrandDto } from './brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createBrandDto) {
    let existingBrand = await this.prisma.brand.findFirst({
      where: { name: dto.name },
    });
    if (existingBrand)
      throw new ConflictException('Duplicate entry for unique field.');

    return this.prisma.brand.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async update(id: string, dto: createBrandDto) {
    const { name } = dto;
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found.');
    }
    const existingBrandWithName = await this.prisma.brand.findFirst({
      where: {
        name: dto.name,
        NOT: { id },
      },
    });

    if (existingBrandWithName) {
      throw new ConflictException(
        'Another brand with this name already exists.',
      );
    }
    return this.prisma.brand.update({
      where: { id },
      data: dto,
    });
  }
  async delete(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found.');
    }
    return this.prisma.brand.delete({ where: { id } });
  }
}
