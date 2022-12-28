import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Value } from './value.model';

@Injectable()
export class ValueService {
    constructor(@InjectModel(Value) private valueRepository: typeof Value) { }

  // Getting cost properties from Value table
  async getCostProperties(route_guid: string) {
    const valueProperties = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'SAMP'
      },
      attributes: ['prop_name', 'prop_value']
    });

    let properties = {};

    for (let prop of valueProperties) {
      const propName = prop.prop_name;
      properties[propName] = prop.prop_value;
    };

    return properties;
  };

  // Getting cost salary from Value table
  async getCostSalary(route_guid: string) {
    const valueSalary = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'UNIT'
      },
      attributes: ['kp_table_guid', 'prop_value']
    });

    let salary = [];

    for (let obj of valueSalary) {
      salary.push({
        'kp_unit_guid': obj.kp_table_guid,
        'kp_unit_salary': obj.prop_value
      })
    };

    return salary;
  };

  // Getting cost overhead from Value table
  async getCostOverhead(route_guid: string) {
    const valueOverhead = await this.valueRepository.findAll({
      where: {
        kp_route_guid: route_guid,
        kp_table_name: 'OVERHEAD'
      },
      attributes: ['prop_desc', 'prop_name', 'prop_value']
    });

    let overhead = [];

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
}
