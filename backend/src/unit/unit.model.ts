import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { DecimalDataType} from "sequelize/types";
import { Usrp } from "../usrp/usrp.model";
import { Stag } from "../stag/stag.model";

interface UnitAttrs{
  kp_unit_guid: string;
  kp_stage_guid: string;
  opr_usl_unit_id: string;
  usl_quan_unit: string;
  opr_usl_unit: string;
  nsu_menge: DecimalDataType;
  vat_rate: string;
  opr_usl_unit_restr_quan: string;
  opr_usl_unit_restr_menge: string;
}

@Table({tableName:'ztin_suz_kp_unit', createdAt: false, updatedAt: false})
export class Unit extends Model<Unit, UnitAttrs> {
  @ApiProperty({description: 'Ключ расченки в шаблоне КП', example: 'string(32)'})
  @Column({type: DataType.STRING(32), unique: true, primaryKey: true})
  kp_unit_guid: string;
  @ApiProperty({description: 'Ключ шаблона КП', example: 'string(32)'})
  @ForeignKey( () => Stag)
  @Column({type: DataType.STRING(32)})
  kp_stage_guid: string;
  @ApiProperty({description: 'ID Расценки', example: 'string(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_unit_id: string;
  @ApiProperty({description: 'Единица измерения', example: 'string(3)'})
  @Column({type: DataType.STRING(3)})
  usl_quan_unit: string;
  @ApiProperty({description: 'Наименование расценки', example: 'string(1333)'})
  @Column({type: DataType.STRING(1333)})
  opr_usl_unit: string;
  @ApiProperty({description: 'Количество', example: 'number'})
  @Column({type: DataType.DECIMAL(13,3)})
  nsu_menge: DecimalDataType;
  @ApiProperty({description: 'Ставка НДС', example: 'string(2)'})
  @Column({type: DataType.STRING(2)})
  vat_rate: string;
  @ApiProperty({description: 'Ограничить ЕИ', example: 'string(1)'})
  @Column({type: DataType.STRING(1)})
  opr_usl_unit_restr_quan: string;
  @ApiProperty({description: 'Ограничить количество ЕИ', example: 'string(1)'})
  @Column({type: DataType.STRING(1)})
  opr_usl_unit_restr_menge: string;

  @HasMany( () => Usrp) 
  usrps: Usrp[];
}