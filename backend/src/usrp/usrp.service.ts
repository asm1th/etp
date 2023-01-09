import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUsrpDTO } from './dto/update_usrp.dto';
import { Usrp } from './usrp.model';

@Injectable()
export class UsrpService {
  constructor(@InjectModel(Usrp) private userRepository: typeof Usrp) { }

  async getAllUsrps(): Promise<Usrp[]> {
    return await this.userRepository.findAll();
  }

  async getOneUsrp(kp_usrp_guid: string): Promise<Usrp> {
    return await this.userRepository.findOne({
      where: {kp_usrp_guid}, 
      include: { all: true, nested: true }
    });
  }

  async updateUsrp(kp_usrp_guid: string, dto: UpdateUsrpDTO) {
    return await this.userRepository.update(
      {... dto},
      {where: {
        kp_usrp_guid: kp_usrp_guid
      }}
    );
  }
}
