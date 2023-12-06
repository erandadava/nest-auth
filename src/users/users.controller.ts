import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Put, Patch, Res, Delete, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { Users } from './users..interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): Promise<Users> {
    return this.usersService.findUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.usersService.deleteUser(id)
  } 
}