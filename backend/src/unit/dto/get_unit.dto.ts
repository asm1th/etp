import { ApiProperty } from "@nestjs/swagger";

export class UnitDto {
  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'varchar(32)'})
  kp_unit_guid: string;

  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'varchar(32)'})
  link_id: string;

  @ApiProperty({description: 'Ключ шаблона КП', example: 'varchar(32)'})
  kp_stage_guid: string;

  @ApiProperty({description: 'ID Расценки', example: 'varchar(12)'})
  opr_usl_unit_id: string;

  @ApiProperty({description: 'Единица измерения', example: 'varchar(3)'})
  usl_quan_unit: string;

  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  opr_usl_unit: string;

  @ApiProperty({description: 'Количество', example: 'decimal(13,3)'})
  nsu_menge: number;

  @ApiProperty({description: 'Ставка НДС', example: 'varchar(2)'})
  vat_rate: string;

  @ApiProperty({description: 'Ограничить ЕИ', example: 'varchar(1)'})
  opr_usl_unit_restr_quan: string;

  @ApiProperty({description: 'Ограничить количество ЕИ', example: 'varchar(1)'})
  opr_usl_unit_restr_menge: string;

  @ApiProperty({description: 'Стоимость расценки', example: 'decimal(17,2)'})
  prices_user: number;

  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  alt_name_unit: string;

  @ApiProperty({description: 'Комментарий к НДС в КП', example: 'varchar(1333)'})
  nds_comm: string;
}