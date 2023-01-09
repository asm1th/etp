import { Test, TestingModule } from '@nestjs/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValueService],
    }).compile();

    service = module.get<ValueService>(ValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
