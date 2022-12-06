import { ApiProperty } from "@nestjs/swagger";

export class UpdateLinkDTO{
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'string'})
  readonly link: string;
  @ApiProperty({description: 'Срок действия предложения от контрагента', example: 'date(YYYYMMDD)'})
  readonly kp_offer_expire_date: Date;
  @ApiProperty({description: 'Командировочные расходы', example: 'number'})
  travel_exp: number;
  @ApiProperty({description: 'Комментарий к командировочным расходам', example: 'string'})
  readonly travel_exp_comm: string;
}