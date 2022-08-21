import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usrp } from './usrp.model';

@Injectable()
export class UsrpService {
  constructor(@InjectModel(Usrp) private userRepository: typeof Usrp) { }

  async getAllUsrps() {
    const Usrps = await this.userRepository.findAll();
    return Usrps;
  }

  async getOneUsrp(kp_unit_guid: string){
    return this.userRepository.findOne({where: {kp_unit_guid}, include: { all: true, nested: true }});
  }
}
