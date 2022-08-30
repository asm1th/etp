import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DecimalDataType} from "sequelize/types";
import { Unit } from "../unit/unit.model";

interface UsrpAttrs{
  kp_unit_guid: string;
  link_id: string;
  prices_user: DecimalDataType;
  usl_quan_unit: string;
  nsu_menge: DecimalDataType;
  vat_rate: string;
  alt_name_unit: string;
  nds_comm: string;
}

@Table({tableName:'ztin_suz_kp_usrp', createdAt: false, updatedAt: false})
export class Usrp extends Model<Usrp, UsrpAttrs> {
  @ApiProperty({description: 'Ключ расченки в шаблоне КП', example: 'string(32)'})
  @ForeignKey( () => Unit)
  @Column({type: DataType.STRING(32), primaryKey: true})
  kp_unit_guid: string;
  @ApiProperty({description: 'Ключ для расценки контрагента в шаблоне КП', example: 'string(32)'})
  @Column({type: DataType.STRING(32), primaryKey: true})
  link_id: string;
  @ApiProperty({description: 'Стоимость расценки', example: 'number'})
  @Column({type: DataType.DECIMAL(17,2), primaryKey: true})
  prices_user: DecimalDataType;
  @ApiProperty({description: 'Единица измерения', example: 'string(3)'})
  @Column({type: DataType.STRING(3)})
  usl_quan_unit: string;
  @ApiProperty({description: 'Количество', example: 'number'})
  @Column({type: DataType.DECIMAL(13,3)})
  nsu_menge: DecimalDataType;
  @ApiProperty({description: 'Ставка НДС', example: 'string(2)'})
  @Column({type: DataType.STRING(2)})
  vat_rate: string;
  @ApiProperty({description: 'Наименование расценки', example: 'string(1333)'})
  @Column({type: DataType.STRING(1333)})
  alt_name_unit: string;
  @ApiProperty({description: 'Комментарий к НДС в КП', example: 'string(1333)'})
  @Column({type: DataType.STRING(1333)})
  nds_comm: string;
}