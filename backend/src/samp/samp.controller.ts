import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Samp } from './samp.model';
import { SampService } from './samp.service';

@ApiTags('Шаблон КП')
@Controller('samp')
export class SampController {
  constructor(private SampService: SampService ){}

  @ApiOperation({summary: 'Получение всех шаблонов КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Samp })
  @Get()
  getAll(){
    return this.SampService.getAllSamps();
  }

  @ApiOperation({summary: 'Получение шаблона КП'})
  @ApiParam({ name: "kp_sample_guid", required: true, description: "Ключ шаблона КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Samp })
  @Get(':kp_sample_guid')
  getEntity(@Param('kp_sample_guid') kp_sample_guid: string){
    return this.SampService.getOneSamps(kp_sample_guid)
  }
}
