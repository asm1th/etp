import { ApiProperty } from "@nestjs/swagger";
import { DateOnlyDataType } from "sequelize/types";

export class KpHeaderDto{
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП'})
  readonly link: string;
  @ApiProperty({description: 'Ключ шаблона КП'})
  readonly kp_sample_guid: string;
  @ApiProperty({description: 'Email'})
  readonly info_ka_email: string;
  @ApiProperty({description: 'Наименование Участника(Компании)'})
  readonly info_ka_name: string;
  @ApiProperty({description: 'Срок действия предложения от контрагента'})
  readonly kp_offer_expire_date: DateOnlyDataType;
  @ApiProperty({description: 'Командировочные расходы'})
  readonly travel_exp: DateOnlyDataType;
  @ApiProperty({description: 'Комментарий к командировочным расходам'})
  readonly travel_exp_comm: string;
}