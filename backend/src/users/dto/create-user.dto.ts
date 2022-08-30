import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
  @ApiProperty({description: 'Имя'})
  firstname: string;
  @ApiProperty({description: 'Отчество'})
  patronymic: string;
  @ApiProperty({description: 'Email'})
  email: string;  
  @ApiProperty({description: 'Полное наименование организации'})
  org_fullname: string;
  @ApiProperty({description: 'Краткое наименование организации'})
  org_shortname: string;
  @ApiProperty({description: 'Телефон организации'})
  org_telephone: string;
  @ApiProperty({description: 'Email организации'})
  org_email: string;
  @ApiProperty({description: 'Пароль'})
  password: string;
  @ApiProperty({description: 'ИНН'})
  inn: string;
  @ApiProperty({description: 'КПП'})
  kpp: string;
  @ApiProperty({description: 'Резедент или нерезедент'})
  isResident: boolean;
  @ApiProperty({description: 'Индикатор "Физическое лицо"'})
  isIndividual: boolean;
  @ApiProperty({description: 'Регистрация по токену'})
  isToken: string;
  @ApiProperty({description: 'Внесен в реестр СМСП'})
  isSmsp: string;  
}