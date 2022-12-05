import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { DateOnlyDataType, DecimalDataType} from "sequelize/types";
import { Samp } from "../samp/samp.model";

interface KpLinkAttrs{
  link: string;
  kp_sample_guid: string;
  info_ka_email: string;
  info_ka_name: string;
  kp_offer_expire_date: DateOnlyDataType;
  travel_exp: DecimalDataType;
  travel_exp_comm: string;
}

@Table({tableName:'ztin_suz_kp_link', createdAt: false, updatedAt: false})
export class KpLink extends Model<KpLink, KpLinkAttrs> {
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'string(32)'})
  @Column({type: DataType.STRING(32), unique: true, primaryKey: true})
  link: string;
  @ApiProperty({description: 'Email', example: 'string(128)'})
  @Column({type: DataType.STRING(128)})
  info_ka_email: string;
  @ApiProperty({description: 'Наименование Участника(Компании)', example: 'string(132)'})
  @Column({type: DataType.STRING(132)})
  info_ka_name: string;
  @ApiProperty({description: 'Срок действия предложения от контрагента', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY})
  kp_offer_expire_date: DateOnlyDataType;
  @ApiProperty({description: 'Командировочные расходы', example: 'number'})
  @Column({type: DataType.DECIMAL(17,2)})
  travel_exp: DecimalDataType;
  @ApiProperty({description: 'Комментарий к командировочным расходам', example: 'string(1333)'})
  @Column({type: DataType.STRING(1333)})
  travel_exp_comm: string;

  @HasMany( () => Samp) 
  samps: Samp[];  
  
}