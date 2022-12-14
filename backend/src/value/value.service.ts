import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Value } from './value.model';

export interface CostProperties {
  [key: string]: string;
  cntrb_oms?: string;
  cntrb_pension?: string;
  cntrb_disability?: string;
  profitability?: string;
  btrip_price?: string;
};

export interface CostSalary {
  [key: string]: string;
  kp_unit_guid?: string;
  kp_unit_salary?: string;
};

export interface CostOverhead {
  [key: string]: string;
  cost_id?: string;
  cost_value?: string;
  cost_description?: string;
}

export interface CostResult {
  [key: string]: string;
  kp_price_nds?: string,
  kp_price?: string,
  kp_price_ei?: string,
}

@Injectable()
export class ValueService {
  constructor(@InjectModel(Value) private valueRepository: typeof Value) { }

  // Getting cost properties from Value table
  public async getCostProperties(route_guid: string): Promise<CostProperties> {
    const valueProperties = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'SAMP'
      },
      attributes: ['prop_name', 'prop_value']
    });

    let properties: CostProperties = {};

    for (let prop of valueProperties) {
      const propName = prop.prop_name.toLowerCase();
      properties[propName] = prop.prop_value;
    };

    return properties;
  };

  // Getting cost salary from Value table
  public async getCostSalary(route_guid: string): Promise<CostSalary[]> {
    const valueSalary = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'UNIT'
      },
      attributes: ['kp_table_guid', 'prop_value']
    });

    let salary: CostSalary[] = [];

    for (let obj of valueSalary) {
      salary.push({
        'kp_unit_guid': obj.kp_table_guid,
        'kp_unit_salary': obj.prop_value
      })
    };

    return salary;
  };

  // Getting cost overhead from Value table
  public async getCostOverhead(route_guid: string): Promise<CostOverhead[]> {
    const valueOverhead = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'OVERHEAD'
      },
      attributes: ['prop_desc', 'prop_name', 'prop_value']
    });

    let overhead: CostOverhead[] = [];

    for (let obj of valueOverhead) {
      let cost_id = obj.prop_name.split('_')[1];
      overhead.push({
        'cost_id': cost_id,
        'cost_value': obj.prop_value,
        'cost_description': obj.prop_desc
      });
    };
    
    return overhead;
  };

  // Getting cost result from Value table
  public async getCostResults(route_guid: string): Promise<CostResult> {
    const valueResults = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'COST'
      },
      attributes: ['prop_name', 'prop_value']
    });

    let results: CostResult = {};

    for (let res of valueResults) {
      const resKey = res.prop_name.toLowerCase();
      results[resKey] = res.prop_value;
    };
    
    return results;
  }
}
