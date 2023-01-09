import { Test, TestingModule } from '@nestjs/testing';
import { ValueController } from './value.controller';

describe('ValueController', () => {
  let controller: ValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValueController],
    }).compile();

    controller = module.get<ValueController>(ValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
