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
    let usrp: Usrp;

    try {
      usrp = await this.userRepository.findOne({
        where: {
          kp_usrp_guid: dto.kp_usrp_guid
        }
      });
      usrp.set(dto);
      return await usrp.save();
    } catch(err) {
      console.error(err)
      throw new HttpException('Ключ расценки в шаблоне КП не найден', HttpStatus.NOT_FOUND);  
    }
  }
}
