import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class createValue {
  @ApiProperty({description: 'Ключ расценки', example: 'uuid'})
  @IsNotEmpty()
  @IsUUID()
  kp_table_guid: any;

  @ApiProperty({description: 'Ключ расценки', example: 'varchar(10)'})
  @IsNotEmpty()
  @Length(10)
  kp_table_name: string;

  @ApiProperty({description: 'Ключ расценки', example: 'varchar(20)'})
  @IsNotEmpty()
  @Length(20)
  prop_name: string;

  @ApiProperty({description: 'Ключ расценки', example: 'varchar(255)'})
  @IsNotEmpty()
  @Length(255)
  prop_value: string;

  @ApiProperty({description: 'Ключ расценки', example: 'varchar(255)'})
  @Length(255)
  prop_desc: string;
}