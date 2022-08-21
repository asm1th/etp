import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stag } from './stag.model';
import { StagService } from './stag.service';

@ApiTags('Этап в шаблоне КП')
@Controller('stag')
export class StagController {
  constructor(private StagService: StagService ){}

  @ApiOperation({summary: 'Получение всех этапов в шаблоне КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Stag })
  @Get()
  getAll(){
    return this.StagService.getAllStags();
  }

  @ApiOperation({summary: 'Получение этапа в шаблоне КП'})
  @ApiParam({ name: "kp_stage_guid", required: true, description: "Ключ шаблона КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Stag })
  @Get(':kp_stage_guid')
  getEntity(@Param('kp_stage_guid') kp_stage_guid: string){
    return this.StagService.getOneStag(kp_stage_guid)
  }
}
