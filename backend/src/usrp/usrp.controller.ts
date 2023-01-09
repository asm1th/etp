import { Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @Get(':kp_usrp_guid')
  async getEntity(@Param('kp_usrp_guid', ParseUUIDPipe) kp_usrp_guid: string) {
    const usrp = await this.UsrpService.getOneUsrp(kp_usrp_guid);
    
    if (!usrp) {
      throw new NotFoundException('Ключ расценки в шаблоне КП не найден');
    };

    return usrp;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({summary: 'Обновление данных по командировке в шаблоне КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateUsrpDTO })
  @Put(':kp_usrp_guid')
  async modifyEntity(
    @Param('kp_usrp_guid', ParseUUIDPipe) kp_usrp_guid: string,
    @Body() dto: UpdateUsrpDTO) {
    const updatedUsrp = await this.UsrpService.updateUsrp(kp_usrp_guid, dto);

    if (!updatedUsrp) {
      throw new NotFoundException('Ключ расценки в шаблоне КП не найден');  
    };

    return updatedUsrp;
  }
}
