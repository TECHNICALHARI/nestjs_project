import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMedicineDto, UpdateMedicineDto } from './medicine.dto';

@Injectable()
export class MedicineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMedicineDto) {
    const { attributes, ...rest } = dto;
    const medicineData = {
      ...rest,
      attributes: {
        create: attributes.map((attr) => ({
          size: attr.size,
          mrp: attr.mrp,
          saleRate: attr.saleRate,
          stock: attr.stock,
        })),
      },
    };
    const medicine = await this.prisma.medicine.create({
      data: medicineData,
      include: { attributes: true },
    });
    return medicine;
  }

  async findAll() {
    const data = await this.prisma.medicine.findMany({
      select: {
        id: true,
        name: true,
        thumbnail: true,
        images: true,
        category: {
          select: { name: true },
        },
        subcategory: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
        attributes: {
          select: {
            id: true,
            mrp: true,
            saleRate: true,
            stock: true,
            size: true,
          },
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    const medicine = data.map((item) => {
      const { attributes, category, subcategory, brand, ...rest } = item;
      return {
        ...rest,
        category: category?.name || null,
        subCategory: subcategory?.name || null,
        brand: brand?.name || null,
        mrp: attributes[0]?.mrp,
        saleRate: attributes[0]?.saleRate,
        stock: attributes[0]?.stock,
        attributeId: attributes[0]?.id,
      };
    });
    return medicine;
  }
}
