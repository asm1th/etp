import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Samp } from "../samp/samp.model";
import { Cost } from "../cost/cost.model";
import { Value } from "../value/value.model";
import { Trip } from "../trip/trip.model";

interface RouteAttrs{
  route_guid: any;
  link_guid: any;
  kp_sample_guid: any;
  kp_cost_guid: any;
  kp_btrip_guid: any;
  kp_value_guid: any;
}

@Table({tableName:'ztin_suz_kp_route', createdAt: false, updatedAt: false})
export class Route extends Model<Route, RouteAttrs> {
  @ApiProperty({description: 'Ключ направления', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4})
  route_guid: any;
  
  @ApiProperty({description: 'Ключ расценки', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID})
  kp_sample_guid: any;

  @ApiProperty({description: 'Ключ ссылки', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID})
  link_guid: any;

  @ApiProperty({description: 'Ключ стоимости', example: 'uuid'})
  @Column({type: DataType.UUID})
  kp_cost_guid: any;

  @ApiProperty({description: 'Ключ командировки', example: 'uuid'})
  @Column({type: DataType.UUID})
  kp_btrip_guid: any;

  @ApiProperty({description: 'Ключ значения', example: 'uuid'})
  @Column({type: DataType.UUID})
  kp_value_guid: any;

  @HasMany(() => Cost)
  costs: Cost[];

  @HasMany(() => Value)
  value: Value[];

  @HasMany(() => Trip)
  trips: Trip[];

  @HasOne(() => Samp)
  samp: Samp;

}