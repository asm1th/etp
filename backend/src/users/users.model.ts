import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs{
  lastname: string;
  firstname: string;
  patronymic: string;
  email: string;
  resident: boolean;
  individual: boolean;
  org_fullname: string;
  org_shortname: string;
  org_telephone: string;
  org_email: string;
  password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ApiProperty({description: 'Фамилия'})
  @Column({type: DataType.STRING,})
  lastname: string;
  @ApiProperty({description: 'Имя'})
  @Column({type: DataType.STRING})
  firstname: string;
  @ApiProperty({description: 'Отчество'})
  @Column({type: DataType.STRING})
  patronymic: string;
  @ApiProperty({description: 'Email'})
  @Column({type: DataType.STRING, unique: true})
  email: string;  
  @ApiProperty({description: 'Полное наименование организации'})
  @Column({type: DataType.STRING}) 
  org_fullname: string;
  @ApiProperty({description: 'Краткое наименование организации'})
  @Column({type: DataType.STRING}) 
  org_shortname: string;
  @ApiProperty({description: 'Телефон организации'})
  @Column({type: DataType.STRING, unique: true}) 
  org_telephone: string;
  @ApiProperty({description: 'Email организации'})
  @Column({type: DataType.STRING, unique: true}) 
  org_email: string;
  @ApiProperty({description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false}) 
  password: string;
  @ApiProperty({description: 'ИНН'})
  @Column({type: DataType.STRING}) 
  inn: string;
  @ApiProperty({description: 'КПП'})
  @Column({type: DataType.STRING}) 
  kpp: string;
  @ApiProperty({description: 'Резедент или нерезедент'})
  @Column({type: DataType.BOOLEAN})
  isResident: boolean;
  @ApiProperty({description: 'Индикатор "Физическое лицо"'})
  @Column({type: DataType.BOOLEAN})
  isIndividual: boolean;
  @ApiProperty({description: 'Регистрация по токену'})
  @Column({type: DataType.STRING}) 
  isToken: string;
  @ApiProperty({description: 'Внесен в реестр СМСП'})
  @Column({type: DataType.STRING}) 
  isSmsp: string;  
}