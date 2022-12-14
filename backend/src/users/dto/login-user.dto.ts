import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{
  @ApiProperty({description: 'Email'})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'Пароль'})
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}