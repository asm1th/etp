import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Samp } from './samp.model';

@Injectable()
export class SampService {
  constructor(@InjectModel(Samp) private userRepository: typeof Samp) { }

  async getAllSamps() {
    const Samp = await this.userRepository.findAll({include: { all: true, nested: true }});
    return Samp;
  }

  async getOneSamps(kp_sample_guid: string){
    return this.userRepository.findOne({where: {kp_sample_guid}, include: { all: true, nested: true }});
  }
}
