import { Controller, Get, Post, Body, Param } from '@nestjs/common';

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
    return this.usersService.create(createUserDto);
  }

  // @Get(':id')
  // show(@Param('id') id: string) {
  //   return this.usersService.showById(+id);
  // }
}