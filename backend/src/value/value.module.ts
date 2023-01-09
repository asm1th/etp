import { Module } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueController } from './value.controller';
import { Value } from './value.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ValueService, ValueService],
  controllers: [ValueController],
  imports: [
    SequelizeModule.forFeature([Value])
  ],
  exports: [
    ValueService
  ]
})
export class ValueModule {}
