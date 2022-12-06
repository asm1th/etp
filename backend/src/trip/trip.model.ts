import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "src/route/route.model";
import { Unit } from "src/unit/unit.model";

interface TripAttrs {
  kp_btrip_guid: any;
  kp_unit_guid: any;
  pers_count: number;
  btrip_days: number;
  btrip_cost: number;
  btrip_day_cost: number;
  btrip_day_allow: number;
}

@Table({tableName:'ztin_suz_kp_route', createdAt: false, updatedAt: false})
export class Trip extends Model<Trip, TripAttrs> {
  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_btrip_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Unit)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_unit_guid: any;

  @ApiProperty({description: '', example: 'number'})
  @Column({type: DataType.NUMBER})
  pers_count: number;

  @ApiProperty({description: '', example: 'number'})
  @Column({type: DataType.NUMBER})
  btrip_days: number;

  @ApiProperty({description: '', example: 'decimal(17, 2)'})
  @Column({type: DataType.DECIMAL(17, 2)})
  btrip_cost: number;

  @ApiProperty({description: '', example: 'decimal(17, 2)'})
  @Column({type: DataType.DECIMAL(17, 2)})
  btrip_day_cost: number;

  @ApiProperty({description: '', example: 'decimal(17, 2)'})
  @Column({type: DataType.DECIMAL(17, 2)})
  btrip_day_allow: number;

  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsTo(() => Route)
  route: Route;
}