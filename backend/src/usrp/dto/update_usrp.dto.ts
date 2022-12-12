import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsrpDTO {
  @ApiProperty({description: 'Ключ расценки', example: 'uuid'})
  kp_usrp_guid: any;
  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'uuid'})
  kp_unit_guid: any;
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'varchar(32)'})
  link_id: string;
  @ApiProperty({description: 'Стоимость расценки', example: 'decimal(17,2)'})
  prices_user: number;
  @ApiProperty({description: 'Единица измерения', example: 'varchar(3)'})
  usl_quan_unit: string;
  @ApiProperty({description: 'Количество', example: 'decimal(13,3)'})
  nsu_menge: number;
  @ApiProperty({description: 'Ставка НДС', example: 'varchar(2)'})
  vat_rate: string;
  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  alt_name_unit: string;
  @ApiProperty({description: 'Комментарий к НДС в КП', example: 'varchar(1333)'})
  nds_comm: string;
}