import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Samp } from 'src/samp/samp.model';
import { KpHeaderDto } from './dto/kp_header.dto';
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
    console.log('GUID = %s', link);
    return this.userRepository.findOne({where: {link}, include: { all: true, nested: true }});
  }
}
