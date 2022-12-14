import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Stag } from "../stag/stag.model";
import { Route } from "../route/route.model";

interface SampAttrs{
  kp_sample_guid: any;
  kp_route_guid: any;
  konkurs_id: string;
  lot_id: string;
  kp_send_date: Date;
  kp_send_time: Date;
  kp_author: string;
  kp_crt_date: Date;
  kp_crt_time: Date;
  kp_contr_end_date: Date;
  sample_type: string;
  opr_usl_segment_id: string;
  opr_usl_subseg_id: string;
  opr_usl_code: string;
  fl_del: boolean;
}

@Table({tableName:'ztin_suz_kp_samp', createdAt: false, updatedAt: false})
export class Samp extends Model<Samp, SampAttrs> {
  @ApiProperty({description: 'Ключ шаблона КП', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID(), unique: true, primaryKey: true, defaultValue: DataType.UUIDV4})
  kp_sample_guid: any;

  @ApiProperty({description: 'Ссылка на таблицу route', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUID(), defaultValue: DataType.UUIDV4})
  kp_route_guid: any;
  
  @ApiProperty({description: 'Идентификатор конкурса', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  konkurs_id: string;

  @ApiProperty({description: 'Идентификатор лота', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  lot_id: string;
  
  @ApiProperty({description: 'Срок приема КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY()})
  kp_accep_date: Date;
  
  @ApiProperty({description: 'Дата отправки КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY()})
  kp_send_date: Date;
  
  @ApiProperty({description: 'Время отправки КП', example: 'time(hh-mm-ss)'})
  @Column({type: DataType.TIME()})
  kp_send_time: Date;
  
  @ApiProperty({description: 'Автор', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  kp_author: string;
  
  @ApiProperty({description: '', example: 'date(YYYYMMDD)'})
  @AllowNull(false)
  @Column({type: DataType.DATEONLY()})
  kp_crt_date: Date;
  
  @ApiProperty({description: '', example: 'time(hh-mm-ss)'})
  @AllowNull(false)
  @Column({type: DataType.TIME()})
  kp_crt_time: Date;
  
  @ApiProperty({description: '', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY()})
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
  @AllowNull(false)
  @Column({type: DataType.BOOLEAN()})
  fl_del: boolean;

  @ApiProperty({description: 'Виртуальное поле для получения затрат'})
  @Column({type: DataType.VIRTUAL})
  costs: {};

  @BelongsTo(() => Route)
  route: Route;

  @HasMany(() => Stag)
  stages: Stag;
}