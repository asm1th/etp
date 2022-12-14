import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "../route/route.model";
import { Stag } from "../stag/stag.model";

interface CostAttrs {
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

@Table({tableName:'ztin_suz_kp_cost', createdAt: false, updatedAt: false})
export class Cost extends Model<Cost, CostAttrs> {
  @ApiProperty({description: 'Ключ затраты', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4})
  kp_cost_guid: any;

  @ApiProperty({description: 'Этап', example: 'uuid'})
  @ForeignKey(() => Stag)
  @Column({type: DataType.UUID, primaryKey: true})
  kp_stage_guid: any;

  @ApiProperty({description: 'Тип', example: 'varchar(2)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(2)})
  cost_type: string;

  @ApiProperty({description: 'Наименование', example: 'varchar(2)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(2)})
  cost_name: string;

  @ApiProperty({description: 'ЕИ', example: 'varchar(3)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(3)})
  cost_meins: string;

  @ApiProperty({description: 'Количество ЕИ', example: 'decimal(13, 3)'})
  @AllowNull(false)
  @Column({type: DataType.DECIMAL(13, 3)})
  cost_menge: any;

  @ApiProperty({description: 'Количество месяцев', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  cost_month: number;

  @ApiProperty({description: 'Кол-во месяцев использования', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  cost_months_use: number;

  @ApiProperty({description: 'Срок полезного использования', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  cost_months_useful: number;

  @ApiProperty({description: 'Цена', example: 'decimal(17, 2)'})
  @AllowNull(false)
  @Column({type: DataType.DECIMAL(17, 2)})
  cost_price: number;

  @ApiProperty({description: 'Кол-во чел/мес', example: 'number'})
  @AllowNull(false)
  @Column({type: DataType.INTEGER})
  cost_per_month: number;

  @BelongsTo(() => Stag)
  stag: Stag;

  @BelongsTo(() => Route)
  route: Route;
}