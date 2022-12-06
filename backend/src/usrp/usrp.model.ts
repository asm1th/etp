import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Unit } from "../unit/unit.model";

interface UsrpAttrs{
  kp_usrp_guid: any;
  kp_unit_guid: any
  link_id: any
  prices_user: number
  usl_quan_unit: string
  nsu_menge: number
  vat_rate: string
  alt_name_unit: string
  nds_comm: string
  price_date: Date
  price_time: Date
  num_of_spec: number
  labor_quan: number
  fl_del: boolean
}

@Table({tableName:'ztin_suz_kp_usrp', createdAt: false, updatedAt: false})
export class Usrp extends Model<Usrp, UsrpAttrs> {
  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4})
  kp_usrp_guid: any;

  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'uuid'})
  @ForeignKey(() => Unit)
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_unit_guid: any;

  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  link_id: any;

  @ApiProperty({description: 'Стоимость расценки', example: 'decimal(17,2)'})
  @AllowNull(false)
  @Column({type: DataType.DECIMAL(17,2)})
  prices_user: number;

  @ApiProperty({description: 'Единица измерения', example: 'varchar(3)'})
  @Column({type: DataType.STRING(3)})
  usl_quan_unit: string;

  @ApiProperty({description: 'Количество', example: 'decimal(13,3)'})
  @Column({type: DataType.DECIMAL(13,3)})
  nsu_menge: number;

  @ApiProperty({description: 'Ставка НДС', example: 'varchar(2)'})
  @Column({type: DataType.STRING(2)})
  vat_rate: string;

  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  @Column({type: DataType.STRING(1333)})
  alt_name_unit: string;

  @ApiProperty({description: 'Комментарий к НДС в КП', example: 'varchar(1333)'})
  @Column({type: DataType.STRING(1333)})
  nds_comm: string;

  @ApiProperty({description: 'Дата оплаты', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY})
  price_date: Date;

  @ApiProperty({description: 'Время оплаты', example: 'time(hh-mm-ss)'})
  @Column({type: DataType.TIME})
  price_time: Date;

  @ApiProperty({description: '', example: 'int4'})
  @Column({type: DataType.NUMBER})
  num_of_spec: number;

  @ApiProperty({description: '', example: 'decimal(17, 2)'})
  @Column({type: DataType.DECIMAL(17, 2)})
  labor_quan: number;

  @ApiProperty({description: '', example: 'boolean'})
  @Column({type: DataType.BOOLEAN})
  fl_del: boolean;
  
  @BelongsTo(() => Unit)
  unit: Unit;
}