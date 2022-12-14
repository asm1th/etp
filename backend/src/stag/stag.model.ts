import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Cost } from "../cost/cost.model";
import { Samp } from "../samp/samp.model";
import { Unit } from "../unit/unit.model";

interface StagAttrs{
  kp_stage_guid: any;
  kp_sample_guid: any;
  opr_usl_stage_id: string;
  opr_usl_stage: string;
  opr_usl_stage_num: number;
  fl_del: boolean;
}

@Table({tableName:'ztin_suz_kp_stag', createdAt: false, updatedAt: false})
export class Stag extends Model<Stag, StagAttrs> {
  @ApiProperty({description: 'Ключ шаблона КП', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID(), unique: true, primaryKey: true, defaultValue: DataType.UUIDV4})
  kp_stage_guid: any;

  @ApiProperty({description: 'Ключ шаблона КП', example: 'uuid'})
  @ForeignKey(() => Samp) 
  @Column({type: DataType.UUID(), unique: false})
  kp_sample_guid: any;

  @ApiProperty({description: 'ID этапа', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_stage_id: string;

  @ApiProperty({description: 'Наименование этапа', example: 'varchar(1333)'})
  @Column({type: DataType.STRING(1333)})
  opr_usl_stage: string;

  @ApiProperty({description: 'Идентификатор этапа', example: 'smallInt'})
  @Column({type: DataType.SMALLINT()})
  opr_usl_stage_num: number; 

  @ApiProperty({description: '', example: 'boolean'})
  @AllowNull(false)
  @Column({type: DataType.BOOLEAN})
  fl_del: boolean;

  @BelongsTo(() => Samp)
  samp: Samp;

  @HasMany(() => Unit)
  units: Unit[];

  @HasMany(() => Cost)
  costs: Cost[];
}