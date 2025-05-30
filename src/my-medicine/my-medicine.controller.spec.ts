import { Test, TestingModule } from '@nestjs/testing';
import { MyMedicineController } from './my-medicine.controller';

describe('MyMedicineController', () => {
  let controller: MyMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyMedicineController],
    }).compile();

    controller = module.get<MyMedicineController>(MyMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
