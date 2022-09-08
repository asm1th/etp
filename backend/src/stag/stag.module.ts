import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StagController } from './stag.controller';
import { Stag } from './stag.model';
import { StagService } from './stag.service';

@Module({
  controllers: [StagController],
  providers: [StagService],
  imports: [
    SequelizeModule.forFeature([Stag])
  ]
})
export class StagModule {}
