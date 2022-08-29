import { Module } from '@nestjs/common';
import { KpLinkService } from './link.service';
import { KpLinkController } from './link.controller';
import { KpLink } from './link.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [KpLinkService],
  controllers: [KpLinkController],
  imports: [
    SequelizeModule.forFeature([KpLink])
  ]
})
export class LinkModule {}
