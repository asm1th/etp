import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
  @ApiProperty({description: 'Фамилия'})
  readonly lastname: string;
  @ApiProperty({description: 'Имя'})
  readonly firstname: string;
  @ApiProperty({description: 'Отчество'})
  readonly patronymic: string;
  @ApiProperty({description: 'Email'})
  readonly email: string;
  @ApiProperty({description: 'Резедент или нерезедент'})
  readonly resident: boolean;
  @ApiProperty({description: 'Индикатор "Физическое лицо"'})
  readonly individual: boolean;
  @ApiProperty({description: 'Полное наименование организации'})
  readonly org_fullname: string;
  @ApiProperty({description: 'Краткое наименование организации'})
  readonly org_shortname: string;
  @ApiProperty({description: 'Телефон организации'})
  readonly org_telephone: string;
  @ApiProperty({description: 'Email организации'})
  readonly org_email: string;
  @ApiProperty({description: 'Пароль'})
  readonly password: string;
}