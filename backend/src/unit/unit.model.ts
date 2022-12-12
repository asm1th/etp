import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Stag } from "../stag/stag.model";
import { Usrp } from "../usrp/usrp.model";
import { Trip } from "../trip/trip.model";

interface UnitAttrs{
  kp_unit_guid: any;
  kp_stage_guid: any;
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
  @ApiProperty({description: 'Ключ расценки в шаблоне КП', example: 'uuid'})
  @Column({type: DataType.UUIDV4(), unique: true, primaryKey: true})
  kp_unit_guid: any;

  @ApiProperty({description: 'Ключ шаблона КП', example: 'uuid'})
  @ForeignKey(() => Stag)
  @Column({type: DataType.UUIDV4()})
  kp_stage_guid: any;

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

  @BelongsTo( () => Stag) 
  stag: Stag;

  @HasMany( () => Usrp) 
  usrps: Usrp[];

  @HasOne(() => Trip)
  trip: Trip;
}