import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KpLink } from './link.model';
import { KpLinkService } from './link.service';

@ApiTags('Ключи для формирования ссылки')
@Controller('link')
export class KpLinkController {
  constructor(private KpLinkService: KpLinkService ){}

  @ApiOperation({summary: 'Получение всех ключей для расценкок контрагента в шаблоне КП'})
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: KpLink })
  @Get()
  getAll(){
    return this.KpLinkService.getAllLinks();
  }

  @ApiOperation({summary: 'Получение ключа для расценки контрагента в шаблоне КП'})
  @ApiParam({ name: "link", required: true, description: "Ключ для расценки контрагента в шаблоне КП" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: KpLink })
  @Get(':link')
  getEntity(@Param('link') link: string){
    return this.KpLinkService.getOneLink(link)
  }
}
