import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Put, Patch, Res, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { Users } from './users..interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Users> {
    return this.usersService.findUsers();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }


  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  } 
}