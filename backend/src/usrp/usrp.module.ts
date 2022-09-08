import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsrpController } from './usrp.controller';
import { Usrp } from './usrp.model';
import { UsrpService } from './usrp.service';

@Module({
  controllers: [UsrpController],
  providers: [UsrpService],
  imports: [
    SequelizeModule.forFeature([Usrp])
  ]
})
export class UsrpModule {}
