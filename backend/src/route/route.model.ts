import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Samp } from "src/samp/samp.model";
import { Cost } from "src/cost/cost.model";
import { Value } from "src/value/value.model";
import { Trip } from "src/trip/trip.model";

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
  @Column({type: DataType.UUIDV4, primaryKey: true})
  route_guid: any;

  @ApiProperty({description: 'Ключ ссылки', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  link_guid: any;

  @ApiProperty({description: 'Ключ расценки', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4})
  kp_sample_guid: any;

  @ApiProperty({description: 'Ключ стоимости', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4})
  kp_cost_guid: any;

  @ApiProperty({description: 'Ключ командировки', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4})
  kp_btrip_guid: any;

  @ApiProperty({description: 'Ключ значения', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUIDV4})
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