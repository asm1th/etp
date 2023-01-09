import { Test, TestingModule } from '@nestjs/testing';
import { CostController } from './cost.controller';

describe('CostController', () => {
  let controller: CostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostController],
    }).compile();

    controller = module.get<CostController>(CostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
