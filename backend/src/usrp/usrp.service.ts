import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUsrpDTO } from './dto/update_usrp.dto';
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

  async updateUsrp(dto: UpdateUsrpDTO){
    const usrp = await this.userRepository.findByPk(dto.kp_unit_guid);
    if (!usrp) {
      throw new HttpException('Ключ расценки в шаблоне КП не найден', HttpStatus.NOT_FOUND);  
    }
    usrp.kp_unit_guid = dto.kp_unit_guid;
    usrp.prices_user = dto.prices_user;
    usrp.usl_quan_unit = dto.usl_quan_unit;
    usrp.nsu_menge = dto.nsu_menge;
    usrp.vat_rate = dto.vat_rate;
    usrp.alt_name_unit = dto.alt_name_unit;
    usrp.nds_comm = dto.nds_comm;
    await usrp.save();
    return usrp;

    
  }
}
