import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stag } from './stag.model';

@Injectable()
export class StagService {
  constructor(@InjectModel(Stag) private userRepository: typeof Stag) { }

  async getAllStags() {
    const Stags = await this.userRepository.findAll({order: [ ['opr_usl_stage_num', 'ASC'] ], include: { all: true, nested: true }});

    return Stags;
  }

  async getOneStag(kp_stage_guid: string){
    return this.userRepository.findOne({where: {kp_stage_guid}, include: { all: true, nested: true }});
  }
}
