import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cost } from './cost.model';

@Injectable()
export class CostService {
  constructor(@InjectModel(Cost) private costRepository: typeof Cost) { }

  async getAll() {
    return await this.costRepository.findAll();
  }

  async getCostDeprecation(samp_guid: string): Promise<Cost[]> {
    return await this.costRepository.findAll({
      where: {
        kp_samp_guid: samp_guid,
        cost_type: '1'
      },
      attributes: [
        'kp_cost_guid',
        'cost_name',
        'cost_menge',
        'cost_months_use',
        'cost_months_useful',
        'cost_price',
        'cost_per_month'
      ]
    });
  }

  async getCostOther(samp_guid: string, cost_type: string): Promise<Cost[]> {
    // Cost with type 2 is costOtnerBfoh, with type 3 is costOther
    return await this.costRepository.findAll({
      where: {
        kp_samp_guid: samp_guid,
        cost_type: cost_type
      },
      attributes: [
        'kp_cost_guid',
        'cost_type',
        'cost_name',
        'cost_meins',
        'cost_menge',
        'cost_month',
        'cost_price'
      ]
    });
  }
}
