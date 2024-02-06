import { Test, TestingModule } from '@nestjs/testing';
import { BankWhookController } from './bank-whook.controller';
import { BankWhookService } from './bank-whook.service';

describe('BankWhookController', () => {
  let controller: BankWhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankWhookController],
      providers: [BankWhookService],
    }).compile();

    controller = module.get<BankWhookController>(BankWhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
