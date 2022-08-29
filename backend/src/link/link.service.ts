import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateLinkDTO } from './dto/update_link.dto';
import { KpLink } from './link.model';

@Injectable()
export class KpLinkService {
  constructor(@InjectModel(KpLink) private userRepository: typeof KpLink) { }
  
  async getAllLinks() {
    const kpLinks = await this.userRepository.findAll( {include: {all: true}} );
    return kpLinks;
  }

  /*
  getLink(link: string): Promise<KpHeaderDto> {
    const kpLinks = await this.userRepository.findOne({where: {link}});
    const samp = await Samp.findAll({where: {kpLinkskp_sample_guid} })
    const kp_header = new KpHeaderDto
    return 
  */

  async getOneLink(link: string){
    return this.userRepository.findOne({where: {link}, include: { all: true, nested: true }});
  }

  async updateLink(dto: UpdateLinkDTO){
    const link = await this.userRepository.findByPk(dto.link);
    if (!link) {
      throw new HttpException('Ключ для расценки не найден', HttpStatus.NOT_FOUND);  
    }
    link.kp_offer_expire_date = dto.kp_offer_expire_date;
    link.travel_exp = dto.travel_exp;
    link.travel_exp_comm = dto.travel_exp_comm;
    await link.save();
    return link;
  }
}
