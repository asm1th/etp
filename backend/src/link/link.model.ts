import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { Column, DataType, Model, Table, AllowNull } from "sequelize-typescript";

interface KpLinkAttrs{
  link: any;
  kp_sample_guid: any;
  info_ka_email: string;
  info_ka_name: string;
  inn: string;
  kpp: string;
  kp_offer_expire_date: Date;
  travel_exp: number;
  travel_exp_comm: string;
  fl_del: boolean;
}

@Table({tableName:'ztin_suz_kp_link', createdAt: false, updatedAt: false})
export class KpLink extends Model<KpLink, KpLinkAttrs> {
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, unique: true, primaryKey: true})
  link: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4()})
  kp_sample_guid: any;

  @ApiProperty({description: 'Email', example: 'string(128)'})
  @Column({type: DataType.STRING(128)})
  info_ka_email: string;

  @ApiProperty({description: 'Наименование Участника(Компании)', example: 'string(132)'})
  @IsEmail()
  @Column({type: DataType.STRING(132)})
  info_ka_name: string;

  @ApiProperty({description: 'ИНН', example: 'string(16)'})
  @Column({type: DataType.STRING(16)})
  inn: string;

  @ApiProperty({description: 'КПП', example: 'string(18)'})
  @Column({type: DataType.STRING(18)})
  kpp: string;

  @ApiProperty({description: 'Срок действия предложения от контрагента', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY()})
  kp_offer_expire_date: Date;
  
  @ApiProperty({description: 'Командировочные расходы', example: 'number'})
  @Column({type: DataType.DECIMAL(17,2)})
  travel_exp: number;

  @ApiProperty({description: 'Комментарий к командировочным расходам', example: 'string(1333)'})
  @Column({type: DataType.STRING(1333)})
  travel_exp_comm: string;

  @ApiProperty({description: '', example: 'boolean'})
  @AllowNull(false)
  @Column({type: DataType.BOOLEAN()})
  fl_del: boolean;
}