import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Min } from "class-validator";

export class CreateUserDto{
  @ApiProperty({description: 'Фамилия'})
  @IsNotEmpty()
  @IsAlpha()
  lastname: string;

  @ApiProperty({description: 'Имя'})
  @IsNotEmpty()
  @IsAlpha()
  firstname: string;

  @ApiProperty({description: 'Отчество'})
  @IsAlpha()
  patronymic: string;

  @ApiProperty({description: 'Email'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'Полное наименование организации'})
  @IsNotEmpty()
  @IsString()
  org_fullname: string;

  @ApiProperty({description: 'Краткое наименование организации'})
  @IsNotEmpty()
  @IsString()
  org_shortname: string;

  @ApiProperty({description: 'Телефон организации'})
  @IsNotEmpty()
  @IsPhoneNumber()
  org_telephone: string;

  @ApiProperty({description: 'Email организации'})
  @IsNotEmpty()
  @IsEmail()
  org_email: string;

  @ApiProperty({description: 'Пароль'})
  @IsString()
  @Min(7)
  password: string;

  @ApiProperty({description: 'ИНН'})
  @IsNotEmpty()
  @IsString()
  inn: string;

  @ApiProperty({description: 'КПП'})
  @IsString()
  kpp: string;

  @ApiProperty({description: 'Резедент или нерезедент'})
  @IsBoolean()
  isResident: boolean;

  @ApiProperty({description: 'Индикатор "Физическое лицо"'})
  @IsBoolean()
  isIndividual: boolean;

  @ApiProperty({description: 'Регистрация по токену'})
  @IsBoolean()
  isToken: boolean;

  @ApiProperty({description: 'Внесен в реестр СМСП'})
  @IsBoolean()
  isSmsp: boolean;
}