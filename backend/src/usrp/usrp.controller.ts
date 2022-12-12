import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUsrpDTO } from './dto/update_usrp.dto';
import { Usrp } from './usrp.model';
import { UsrpService } from './usrp.service';

@ApiTags('Таблица цен от контрагентов')
@Controller('usrp')
export class UsrpController {
  constructor(private UsrpService: UsrpService ){}

  @ApiOperation({summary: 'Получение всех цен от контрагентов'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Usrp})
  @Get()
  async getAll() {
    return await this.UsrpService.getAllUsrps();
  }

  @ApiOperation({summary: 'Получение цены от контрагентов'})
  @ApiParam({ name: "link", required: true, description: "Ключ для расценки контрагента в шаблоне КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Usrp })
  @Get(':kp_unit_guid')
  async getEntity(@Param('kp_unit_guid', new ParseUUIDPipe()) kp_unit_guid: string) {
    return await this.UsrpService.getOneUsrp(kp_unit_guid)
  }

  @ApiOperation({summary: 'Обновление данных по командировке в шаблоне КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateUsrpDTO })
  @Put()
  async modifyEntity(@Body() dto: UpdateUsrpDTO): Promise<Usrp> {
    return await this.UsrpService.updateUsrp(dto)
  }
}
