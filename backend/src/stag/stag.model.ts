import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SmallIntegerDataType} from "sequelize/types";
import { Samp } from "../samp/samp.model";
import { Unit } from "../unit/unit.model";

interface StagAttrs{
  kp_stage_guid: string;
  kp_sample_guid: string;
  opr_usl_stage_id: string;
  opr_usl_stage: string;
  opr_usl_stage_num: SmallIntegerDataType;
}

@Table({tableName:'ztin_suz_kp_stag', createdAt: false, updatedAt: false})
export class Stag extends Model<Stag, StagAttrs> {
  @ApiProperty({description: 'Ключ шаблона КП', example: 'varchar(32)'})
  @Column({type: DataType.STRING(32), unique: true, primaryKey: true})
  kp_stage_guid: string;
  @ApiProperty({description: 'Ключ шаблона КП', example: 'varchar(32)'})
  @ForeignKey( () => Samp) 
  @Column({type: DataType.STRING(32), unique: false})
  kp_sample_guid: string;
  @ApiProperty({description: 'ID этапа', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_stage_id: string;
  @ApiProperty({description: 'Наименование этапа', example: 'varchar(1333)'})
  @Column({type: DataType.STRING(1333)})
  opr_usl_stage: string;
  @ApiProperty({description: 'Наименование этапа', example: 'smallInt'})
  @Column({type: DataType.SMALLINT})
  opr_usl_stage_num: SmallIntegerDataType; 

  @HasMany( () => Unit) 
  units: Unit[];
}