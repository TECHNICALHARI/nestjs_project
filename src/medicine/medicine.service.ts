import {  Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}


}
