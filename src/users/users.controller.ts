import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';
import { Users } from './users..interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Users> {
    return this.usersService.findUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {      
      const result = this.usersService.create(createUserDto);
      return result;
    } catch (error) {
      throw new HttpException('User creation failed', HttpStatus  .INTERNAL_SERVER_ERROR);
    }
  }

  // @Get(':id')
  // show(@Param('id') id: string) {
  //   return this.usersService.showById(+id);
  // }
}