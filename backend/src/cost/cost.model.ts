import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "src/route/route.model";
import { Stag } from "src/stag/stag.model";

interface ValueAttrs {
  kp_cost_guid: any;
  kp_stage_guid: any;
  cost_type: string;
  cost_name: string;
  cost_meins: string;
  cost_menge: any;
  cost_month: number;
  cost_months_use: number;
  cost_months_useful: number;
  cost_price: number;
  cost_per_month: number;
}

@Table({tableName:'ztin_suz_kp_route', createdAt: false, updatedAt: false})
export class Value extends Model<Value, ValueAttrs> {
  @ApiProperty({description: 'Ключ затраты', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_cost_guid: any;

  @ApiProperty({description: '', example: 'uuid'})
  @ForeignKey(() => Stag)
  @Column({type: DataType.UUIDV4, primaryKey: true})
  kp_stage_guid: any;

  @ApiProperty({description: 'Наименование', example: 'varchar(2)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(2)})
  cost_type: string;

  @ApiProperty({description: '', example: 'varchar(2)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(2)})
  cost_name: string;

  @ApiProperty({description: '', example: 'varchar(3)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(3)})
  cost_meins: string;

  @ApiProperty({description: 'Количество ЕИ', example: 'decimal(13, 3)'})
  @AllowNull(false)
  @Column({type: DataType.DECIMAL(13, 3)})
  cost_menge: any;

  @ApiProperty({description: 'Количество месяцев', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.NUMBER})
  cost_month: number;

  @ApiProperty({description: 'Кол-во месяцев использования', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.NUMBER})
  cost_months_use: number;

  @ApiProperty({description: 'Срок полезного использования', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.NUMBER})
  cost_months_useful: number;

  @ApiProperty({description: 'Цена', example: 'decimal(17, 2)'})
  @AllowNull(false)
  @Column({type: DataType.DECIMAL(17, 2)})
  cost_price: number;

  @ApiProperty({description: 'Кол-во чел/мес', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.NUMBER})
  cost_per_month: number;

  @BelongsTo(() => Stag)
  stag: Stag;

  @BelongsTo(() => Route)
  route: Route;
}