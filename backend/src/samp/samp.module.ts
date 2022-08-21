import { Module } from '@nestjs/common';
import { SampService } from './samp.service';
import { SampController } from './samp.controller';
import { Samp } from './samp.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [SampService],
  controllers: [SampController],
  imports: [
    SequelizeModule.forFeature([Samp])
  ]
})
export class SampModule {}
