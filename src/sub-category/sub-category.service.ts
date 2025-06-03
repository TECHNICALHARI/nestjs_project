import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSubCategoryDto, updateSubCategoryDto } from './sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}
  async create(dto: createSubCategoryDto) {
    const { name, categoryId } = dto;
    let subCat = await this.prisma.subcategory.findFirst({
      where: { name },
    });
    if (subCat) {
      throw new ConflictException('Duplicate entry for unique field.');
    }
    let category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return this.prisma.subcategory.create({
      data: dto,
    });
  }
  async findAll() {
    let subcategory = this.prisma.subcategory.findMany({
      include: {
        category: {
          select: { name: true },
        },
      },
    });
    return (await subcategory).map((sub) => ({
      id: sub.id,
      name: sub.name,
      category: sub.category.name,
    }));
  }
  async update(id: string, dto: updateSubCategoryDto) {
    let subCat = await this.prisma.subcategory.findUnique({
      where: { id },
    });
    if (!subCat) {
      throw new BadRequestException('No record found on this id');
    }
    if (dto.name) {
      let existingSubCat = await this.prisma.subcategory.findFirst({
        where: { name: dto.name, NOT: { id } },
      });
      if (existingSubCat) {
        throw new ConflictException('Duplicate entry for unique field.');
      }
    }
    return this.prisma.subcategory.update({
      where: { id },
      data: dto,
    });
  }
  async delete(id: string) {
    let subCat = await this.prisma.subcategory.findUnique({ where: { id } });
    if (!subCat) {
      throw new BadRequestException('No record found.');
    }
    return this.prisma.subcategory.delete({ where: { id } });
  }
}
