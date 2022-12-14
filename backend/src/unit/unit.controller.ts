import { Controller, Get, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';

@ApiTags('Выбранные расценки в шаблоне КП')
@Controller('unit')
export class UnitController {
  constructor(private UnitService: UnitService ){}

  @ApiOperation({summary: 'Получить все расценки в шаблоне КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Unit })
  @Get()
  getAll(){
    return this.UnitService.getAllUnits();
  }

  @ApiOperation({summary: 'Получить расценку в шаблоне КП'})
  @ApiParam({ name: "kp_unit_guid", required: true, description: "Ключ расценки в шаблоне КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Unit })
  @Get(':kp_unit_guid')
  getEntity(@Param('kp_unit_guid') kp_unit_guid: string){
    return this.UnitService.getOneUnit(kp_unit_guid)
  }

  @ApiOperation({summary: 'Получить расценку от контрагента в шаблоне КП'})
  @ApiParam({ name: "kp_unit_guid", required: true, description: "Ключ расценки в шаблоне КП" })
  @Get('usrp/:kp_unit_guid')
  getEntityWithUsrp(@Param('kp_unit_guid', ParseUUIDPipe) kp_unit_guid: string) {
    return this.UnitService.getUnitWithUsrp(kp_unit_guid)
  }
}
