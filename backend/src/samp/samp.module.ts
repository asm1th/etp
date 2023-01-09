import { Module } from '@nestjs/common';
import { SampService } from './samp.service';
import { SampController } from './samp.controller';
import { Samp } from './samp.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ValueModule } from 'src/value/value.module';
import { CostModule } from 'src/cost/cost.module';

@Module({
  providers: [SampService],
  controllers: [SampController],
  imports: [
    ValueModule,
    CostModule,
    SequelizeModule.forFeature([Samp])
  ]
})
export class SampModule {}
