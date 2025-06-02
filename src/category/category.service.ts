import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateCategoryDto) {
    const { name } = dto;
    let category = await this.prisma.category.findFirst({
      where: { name },
    });
    if (category) {
      throw new BadRequestException('Category already exists');
    }
    return this.prisma.category.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }
  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }
  async update(id: string, dto: UpdateCategoryDto) {
    let existingCat = await this.prisma.category.findFirst({
      where: { name: dto.name },
    });
    if (existingCat) {
        throw new ConflictException('Duplicate entry for unique field.')
    }
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }
  async delete(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
