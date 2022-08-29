import { ApiProperty } from "@nestjs/swagger";
import { DecimalDataType} from "sequelize/types";


export class UpdateUsrpDTO {
  @ApiProperty({description: 'Ключ расченки в шаблоне КП', example: 'varchar(32)'})
  kp_unit_guid: string;
  @ApiProperty({description: 'Стоимость расценки', example: 'decimal(17,2)'})
  prices_user: DecimalDataType;
  @ApiProperty({description: 'Единица измерения', example: 'varchar(3)'})
  usl_quan_unit: string;
  @ApiProperty({description: 'Количество', example: 'decimal(13,3)'})
  nsu_menge: DecimalDataType;
  @ApiProperty({description: 'Ставка НДС', example: 'varchar(2)'})
  vat_rate: string;
  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  alt_name_unit: string;
  @ApiProperty({description: 'Комментарий к НДС в КП', example: 'varchar(1333)'})
  nds_comm: string;
}