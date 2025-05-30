import { Test, TestingModule } from '@nestjs/testing';
import { MyMedicineService } from './my-medicine.service';

describe('MyMedicineService', () => {
  let service: MyMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyMedicineService],
    }).compile();

    service = module.get<MyMedicineService>(MyMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
