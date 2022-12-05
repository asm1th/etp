import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { Route } from "src/route/route.model";

interface ValueAttrs {
  kp_value_guid: any;
  kp_table_guid: any;
  kp_table_name: any;
  prop_name: string;
  prop_value: string;
  prop_desc: string;
}

@Table({tableName:'ztin_suz_kp_route', createdAt: false, updatedAt: false})
export class Value extends Model<Value, ValueAttrs> {
  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_value_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_table_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
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