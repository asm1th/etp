import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "../route/route.model";

interface SampAttrs{
  kp_sample_guid: string;
  konkurs_id: string;
  lot_id: string;
  kp_accep_date: Date;
  kp_send_date: Date;
}

@Table({tableName:'ztin_suz_kp_samp', createdAt: false, updatedAt: false})
export class Samp extends Model<Samp, SampAttrs> {
  @ApiProperty({description: 'Ключ шаблона КП', example: 'uuid'})
  @Column({type: DataType.UUIDV4, unique: true, primaryKey: true})
  @Default(DataType.UUIDV4)
  @ForeignKey(() => Route)
  kp_sample_guid: any;

  // Relation to entity Route
  @BelongsTo(() => Route)
  kp_sample: Route;
  
  @ApiProperty({description: 'Идентификатор конкурса', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  konkurs_id: string;

  @ApiProperty({description: 'Идентификатор лота', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  lot_id: string;
  
  @ApiProperty({description: 'Срок приема КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATE})
  kp_accep_date: Date;
  
  @ApiProperty({description: 'Дата отправки КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATE})
  kp_send_date: Date;
  
  @ApiProperty({description: 'Время отправки КП', example: 'time(hh-mm-ss)'})
  @Column({type: DataType.TIME})
  kp_send_time: Date;
  
  @ApiProperty({description: 'Автор', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  kp_author: string;
  
  @ApiProperty({description: '', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATE})
  kp_crt_date: Date;
  
  @ApiProperty({description: '', example: 'time(hh-mm-ss)'})
  @Column({type: DataType.TIME})
  kp_crt_time: Date;
  
  @ApiProperty({description: '', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATE})
  kp_contr_end_date: Date;
  
  @ApiProperty({description: '', example: 'time(hh-mm-ss)'})
  @Column({type: DataType.STRING(1)})
  sample_type: string;
  
  @ApiProperty({description: '', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_segment_id: string;
  
  @ApiProperty({description: '', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  opr_usl_subseg_id: string;
  
  @ApiProperty({description: '', example: 'varchar(18)'})
  @Column({type: DataType.STRING(18)})
  opr_usl_code: string;
  
  @ApiProperty({description: '', example: 'boolean'})
  @Column({type: DataType.TIME})
  fl_del: boolean;
}