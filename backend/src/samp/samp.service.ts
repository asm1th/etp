import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cost } from 'src/cost/cost.model';
import { Route } from 'src/route/route.model';
import { Stag } from 'src/stag/stag.model';
import { Trip } from 'src/trip/trip.model';
import { Unit } from 'src/unit/unit.model';
import { Usrp } from 'src/usrp/usrp.model';
import { Value } from 'src/value/value.model';
import { Samp } from './samp.model';

@Injectable()
export class SampService {
  constructor(@InjectModel(Samp) private userRepository: typeof Samp) { }

  async getAllSamps() {
    const Samp = await this.userRepository.findAll({include: { all: true, nested: true }});
    return Samp;
  }

  async getOneSamps(kp_sample_guid: string) {
    return await this.userRepository.findOne({
      where: {kp_sample_guid},
      include: [
        {
          model: Route,
          include: [Cost, Value, Trip]
        },
        {
          model: Stag,
          include: [
            {
              model: Unit,
              include: [Usrp, Trip]
            },
            { model: Cost }
          ]
        }
      ],
    });
  }
}
