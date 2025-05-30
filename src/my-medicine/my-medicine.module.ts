import { Module } from '@nestjs/common';
import { MyMedicineService } from './my-medicine.service';
import { MyMedicineController } from './my-medicine.controller';

@Module({
  providers: [MyMedicineService],
  controllers: [MyMedicineController]
})
export class MyMedicineModule {}
