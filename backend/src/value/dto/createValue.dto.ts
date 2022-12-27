import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateValueDTO {
  @ApiProperty({description: 'Ключ на ссылаемую таблицу', example: 'uuid'})
  @IsNotEmpty()
  @IsUUID()
  kp_table_guid: any;

  @ApiProperty({description: 'Имя таблицы', example: 'varchar(10)'})
  @IsNotEmpty()
  @Length(1, 10)
  kp_table_name: string;

  @ApiProperty({description: 'Название свойства', example: 'varchar(20)'})
  @IsNotEmpty()
  @Length(1, 20)
  prop_name: string;

  @ApiProperty({description: 'Значение свойства', example: 'varchar(255)'})
  @IsNotEmpty()
  @Length(1, 255)
  prop_value: string;

  @ApiProperty({description: 'Описание', example: 'varchar(255)'})
  @Length(0, 255)
  prop_desc: string;
}