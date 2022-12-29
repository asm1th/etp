import { Module } from '@nestjs/common';
import { SampService } from './samp.service';
import { SampController } from './samp.controller';
import { Samp } from './samp.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ValueModule } from 'src/value/value.module';

@Module({
  providers: [SampService],
  controllers: [SampController],
  imports: [
    ValueModule,
    SequelizeModule.forFeature([Samp])
  ]
})
export class SampModule {}
