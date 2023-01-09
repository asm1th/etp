import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RouteController } from './route.controller';
import { Route } from './route.model';
import { RouteService } from './route.service';

@Module({
  controllers: [RouteController],
  providers: [RouteService],
  imports: [
    SequelizeModule.forFeature([Route])
  ]
})
export class RouteModule {}
