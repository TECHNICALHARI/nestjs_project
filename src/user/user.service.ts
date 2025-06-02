import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const { phone, email } = dto;
    let existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });
    if (existingUser) {
      throw new BadRequestException(
        existingUser.phone === phone
          ? 'User already exists with this phone number'
          : 'User already exists with this email',
      );
    }
    return this.prisma.user.create({
      data: {
        ...dto,
        role: dto.role ?? Role.USER,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }
  async update(id: string, dto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
