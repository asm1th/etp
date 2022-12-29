import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValueService } from 'src/value/value.service';
import { Samp } from './samp.model';
import { SampService } from './samp.service';

@ApiTags('Шаблон КП')
@Controller('samp')
export class SampController {
  constructor(
    private SampService: SampService,
    private valueService: ValueService
  ) { }

  @ApiOperation({summary: 'Получение всех шаблонов КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Samp })
  @Get()
  async getAll() {
    return await this.SampService.getAllSamps();
  }

  @ApiOperation({summary: 'Получение шаблона КП'})
  @ApiParam({ name: "kp_sample_guid", required: true, description: "Ключ шаблона КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Samp })
  @Get(':kp_sample_guid')
  async getEntity(@Param('kp_sample_guid') kp_sample_guid: string){
    const samp = await this.SampService.getOneSamps(kp_sample_guid);
    const route_guid = samp.kp_route_guid;

    // Getting cost properties
    const costProperies = await this.valueService.getCostProperties(route_guid);
    const costSalary = await this.valueService.getCostSalary(route_guid);
    const costOverhead = await this.valueService.getCostOverhead(route_guid);
    const costResult = await this.valueService.getCostResults(route_guid);

    // Building samp model
    samp.costs = {
      'cntrb_disability': costProperies.cntrb_disability,
      'cntrb_pension': costProperies.cntrb_pension,
      'btrip_price': costProperies.btrip_price,
      'cntrb_oms': costProperies.cntrb_oms,
      'profitability': costProperies.profitability,
      'cost_overhead': costOverhead,
      'cost_salary': costSalary,
      'cost_result': costResult
    };

    return samp;
  }
}
