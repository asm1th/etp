import { ApiProperty } from "@nestjs/swagger";
import { DateOnlyDataType, DecimalDataType } from "sequelize/types";

export class UpdateLinkDTO{
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'string'})
  readonly link: string;
  @ApiProperty({description: 'Срок действия предложения от контрагента', example: 'date(YYYYMMDD)'})
  readonly kp_offer_expire_date: DateOnlyDataType;
  @ApiProperty({description: 'Командировочные расходы', example: 'number'})
  travel_exp: DecimalDataType;
  @ApiProperty({description: 'Комментарий к командировочным расходам', example: 'string'})
  readonly travel_exp_comm: string;
}