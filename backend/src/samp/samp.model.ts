import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { DateOnlyDataType} from "sequelize/types";
import { KpLink } from "../link/link.model";

interface SampAttrs{
  kp_sample_guid: string;
  konkurs_id: string;
  lot_id: string;
  kp_accep_date: DateOnlyDataType;
  kp_send_date: DateOnlyDataType;
}

@Table({tableName:'ztin_suz_kp_samp', createdAt: false, updatedAt: false})
export class Samp extends Model<Samp, SampAttrs> {
  @ApiProperty({description: 'Ключ шаблона КП', example: 'varchar(32)'})
  @ForeignKey( () => KpLink) 
  @Column({type: DataType.STRING(32), unique: true, primaryKey: true})
  kp_sample_guid: string;
  @ApiProperty({description: 'Идентификатор конкурса', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  konkurs_id: string;
  @ApiProperty({description: 'Идентификатор лота', example: 'varchar(12)'})
  @Column({type: DataType.STRING(12)})
  lot_id: string;
  @ApiProperty({description: 'Срок приема КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY})
  kp_accep_date: DateOnlyDataType;
  @ApiProperty({description: 'Дата отправки КП', example: 'date(YYYYMMDD)'})
  @Column({type: DataType.DATEONLY})
  kp_send_date: DateOnlyDataType;

  //@BelongsTo( () => KpLink )
  //links: KpLink[];
}