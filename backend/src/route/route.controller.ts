import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateValueDTO } from '../value/dto/createValue.dto';
import { Route } from './route.model';
import { RouteService } from './route.service';

@ApiTags('Таблица получения значений из различных таблиц')
@Controller('route')
export class RouteController {
  constructor(private RouteService: RouteService) {}
  
  @ApiOperation({summary: 'Создание значения по ключу ссылки'})
  @ApiResponse({status: 201, type: Route})
  @Post('value/:route_guid')
  async createValue(
    @Param('route_guid', ParseUUIDPipe) route_guid: string,
    @Body() dto: CreateValueDTO[],
  ) {
    return await this.RouteService.createValue(dto, route_guid);
  }
}
