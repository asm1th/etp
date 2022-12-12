import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usrp } from '../usrp/usrp.model';
import { Unit } from './unit.model';

@Injectable()
export class UnitService {
  constructor(@InjectModel(Unit) private userRepository: typeof Unit
              //, @InjectModel(Usrp) private usrpRepository: typeof Usrp 
              ) { }

  async getAllUnits() {
    const Units = await this.userRepository.findAll();
    return Units;
  }

  async getOneUnit(kp_unit_guid: string){
    return this.userRepository.findOne({where: {kp_unit_guid}, include: { all: true, nested: true }});
  }

  async getUnitWithUsrp(kp_unit_guid: string) {
    return await this.userRepository.findOne({
      where: {kp_unit_guid}, 
      include: [{
        model: Usrp,
        attributes: ['link_id', 'prices_user', 'alt_name_unit', 'nds_comm']
      }]
    });
  }
}
