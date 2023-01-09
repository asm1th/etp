import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CostController } from './cost.controller';
import { Cost } from './cost.model';
import { CostService } from './cost.service';

@Module({
  controllers: [CostController],
  providers: [CostService],
  imports: [
    SequelizeModule.forFeature([Cost])
  ],
  exports: [CostService]
})
export class CostModule {}
