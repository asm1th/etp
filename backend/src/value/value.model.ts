import { ApiProperty } from "@nestjs/swagger";
import { AfterCreate, AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Route } from "../route/route.model";

interface ValueAttrs {
  kp_value_guid: any;
  kp_route_guid: any;
  kp_table_guid: any;
  kp_table_name: string;
  prop_name: string;
  prop_value: string;
  prop_desc: string;
}

@Table({tableName:'ztin_suz_kp_value', createdAt: false, updatedAt: false})
export class Value extends Model<Value, ValueAttrs> {
  @ApiProperty({description: 'Ключ', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4})
  kp_value_guid: any;

  @ApiProperty({description: 'Ссылка на таблицу route', example: 'uuid'})
  @AllowNull(false)
  @ForeignKey(() => Route)
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
  kp_route_guid: any;

  @ApiProperty({description: 'Ключ на ссылаемую таблицу', example: 'uuid'})
  @AllowNull(false)
  @Column({type: DataType.UUID, primaryKey: true})
  kp_table_guid: any;

  @ApiProperty({description: 'Имя таблицы', example: 'varchar(10)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(10), primaryKey: true})
  kp_table_name: string;

  @ApiProperty({description: 'Название свойства', example: 'varchar(20)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(20), primaryKey: true})
  prop_name: string;

  @ApiProperty({description: 'Значение свойства', example: 'varchar(255)'})
  @AllowNull(false)
  @Column({type: DataType.STRING(255)})
  prop_value: string;

  @ApiProperty({description: 'Описание', example: 'varchar(255)'})
  @Column({type: DataType.STRING(255)})
  prop_desc: string;

  // Genarate uuid for kp_value_guid field in Route model and instert to Value into kp_value_guid field
  @AfterCreate
  static async afterCreateValue(value: Value) {
    await Route.findOne({
      where: {route_guid: value.kp_route_guid}
    }).then(async route => {
      route.kp_value_guid = value.kp_value_guid;
      await route.save();
    });
  }

  @BelongsTo(() => Route)
  route: Route;
}