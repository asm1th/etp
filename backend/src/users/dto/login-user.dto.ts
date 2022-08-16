import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto{
  @ApiProperty({description: 'Email'})
  readonly email: string;
  @ApiProperty({description: 'Пароль'})
  readonly password: string;
}