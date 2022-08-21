import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Unit } from './unit.model';

@Injectable()
export class UnitService {
  constructor(@InjectModel(Unit) private userRepository: typeof Unit) { }

  async getAllUnits() {
    const Units = await this.userRepository.findAll();
    return Units;
  }

  async getOneUnit(kp_unit_guid: string){
    return this.userRepository.findOne({where: {kp_unit_guid}, include: { all: true, nested: true }});
  }
}
