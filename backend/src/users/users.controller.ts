import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private UsersService: UsersService ){}

  /*
  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type:User})
  @Post()
  create(@Body() userDto: CreateUserDto){
    return this.UsersService.createUser(userDto);
  }
  */

  @ApiOperation({summary: 'Получение списка пользователей'})
  @ApiResponse({status: 200, type:[User]})
  @UseGuards(JWTAuthGuard)
  @Get()
  getAll(){
    return this.UsersService.getAllUsers();
  }
}
