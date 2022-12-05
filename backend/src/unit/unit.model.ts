import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Stag } from "../stag/stag.model";
import { Route } from "../route/route.model";

interface UnitAttrs{
  kp_unit_guid: string;
  kp_stage_guid: string;
  opr_usl_unit_id: string;
  usl_quan_unit: string;
  opr_usl_unit: string;
  nsu_menge: number;
  vat_rate: string;
  opr_usl_unit_restr_quan: boolean;
  opr_usl_unit_restr_menge: boolean;
  fl_del: boolean;
}

@Table({tableName:'ztin_suz_kp_unit', createdAt: false, updatedAt: false})
export class Unit extends Model<Unit, UnitAttrs> {
  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'varchar(32)'})
  @ForeignKey( () => Route)
  @Column({type: DataType.STRING(32), unique: true, primaryKey: true})
  kp_unit_guid: string;

  @ApiProperty({description: 'Ключ шаблона КП', example: 'varchar(32)'})
  @ForeignKey( () => Stag)
  @Column({type: DataType.STRING(32)})
  kp_stage_guid: string;

  @ApiProperty({description: 'ID Расценки', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_unit_id: string;

  @ApiProperty({description: 'Единица измерения', example: 'varchar(3)'})
  @Column({type: DataType.STRING(3)})
  usl_quan_unit: string;

  @ApiProperty({description: 'Наименование расценки', example: 'varchar(1333)'})
  @Column({type: DataType.STRING(1333)})
  opr_usl_unit: string;

  @ApiProperty({description: 'Количество', example: 'decimal(13,3)'})
  @Column({type: DataType.DECIMAL(13,3)})
  nsu_menge: number;

  @ApiProperty({description: 'Ставка НДС', example: 'varchar(2)'})
  @Column({type: DataType.STRING(2)})
  vat_rate: string;

  @ApiProperty({description: 'Ограничить ЕИ', example: 'boolean'})
  @Column({type: DataType.BOOLEAN})
  opr_usl_unit_restr_quan: boolean;

  @ApiProperty({description: 'Ограничить количество ЕИ', example: 'boolean'})
  @Column({type: DataType.BOOLEAN})
  opr_usl_unit_restr_menge: boolean;

  @ApiProperty({description: '', example: 'boolean'})
  @Column({type: DataType.BOOLEAN})
  fl_del: boolean;

  @BelongsTo( () => Route) 
  route: Route;

  @HasMany( () => Stag) 
  stags: Stag[];
}