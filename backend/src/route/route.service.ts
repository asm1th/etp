import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateValueDTO } from '../value/dto/createValue.dto';
import { Route } from './route.model';
import { v4 as uuidv4 } from 'uuid'
import { Value } from '../value/value.model';

@Injectable()
export class RouteService {
  constructor(@InjectModel(Route) private routeRepository: typeof Route) { }

  // Creating values by route uuid
  async createValue(dto: CreateValueDTO[], route_guid: string) {
    const route = await this.routeRepository.findOne({
      where: { route_guid: route_guid },
      include: [Value]
    });
    let value_guid = route.kp_value_guid;

    if (!value_guid) {
      value_guid = uuidv4();
    };

    for (let value of dto) {
      route.value.push(
        await new Value({
          kp_value_guid: value_guid,
          kp_route_guid: route_guid,
          kp_table_guid: value.kp_table_guid,
          kp_table_name: value.kp_table_name,
          prop_name: value.prop_name,
          prop_value: value.prop_value,
          prop_desc: value.prop_desc
        }).save()
      );
    };
    
    return route.value;
  }
}
