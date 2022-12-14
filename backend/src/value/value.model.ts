import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "../route/route.model";

interface ValueAttrs {
  kp_value_guid: any;
  kp_table_guid: any;
  kp_table_name: any;
  prop_name: string;
  prop_value: string;
  prop_desc: string;
}

@Table({tableName:'ztin_suz_kp_value', createdAt: false, updatedAt: false})
export class Value extends Model<Value, ValueAttrs> {
  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4})
  kp_value_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID, primaryKey: true})
  kp_table_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID, primaryKey: true})
  kp_table_name: any;

  @ApiProperty({description: '', example: 'varchar(10)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(10), primaryKey: true})
  prop_name: string;

  @ApiProperty({description: '', example: 'varchar(255)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(255)})
  prop_value: string;

  @ApiProperty({description: '', example: 'varchar(255)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(255)})
  prop_desc: string;

  @BelongsTo(() => Route)
  route: Route;
}