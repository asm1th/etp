import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UnitController } from './unit.controller';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [
    SequelizeModule.forFeature([Unit])
  ]
})
export class UnitModule {}
