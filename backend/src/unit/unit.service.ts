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
    const unit = await this.userRepository.findOne({
      where: {kp_unit_guid}, 
      include: Usrp
    });
    
    // let usrps: object[];
    // unit.usrps.forEach( usrp => {
    //   usrps.push({
    //     'link_id': usrp.link_id,
    //     'prices_user': usrp.prices_user,
    //     'alt_name_unit': usrp.alt_name_unit,
    //     'nds_comm': usrp.nds_comm
    //   })
    // });
    // // const linkIndex = usrps.findIndex( usrps => usrps.kp_unit_guid === kp_unit_guid );
    // // const usrp = usrps[linkIndex];

    // const resultDTO = {
    //   kp_unit_guid:             unit.kp_unit_guid,
    //   // link_id:                  usrp.link_id,
    //   kp_stage_guid:            unit.kp_stage_guid,
    //   opr_usl_unit_id:          unit.opr_usl_unit_id,
    //   usl_quan_unit:            unit.usl_quan_unit,
    //   opr_usl_unit:             unit.opr_usl_unit,
    //   nsu_menge:                unit.nsu_menge,
    //   vat_rate:                 unit.vat_rate,
    //   opr_usl_unit_restr_quan:  unit.opr_usl_unit_restr_quan,
    //   opr_usl_unit_restr_menge: unit.opr_usl_unit_restr_menge,
    //   // prices_user:              usrp.prices_user, 
    //   // alt_name_unit:            usrp.alt_name_unit,
    //   // nds_comm:                 usrp.nds_comm,
    //   // usrps:                    usrps
    // };

    // return resultDTO;
    return unit;
  }
}
