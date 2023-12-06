import { Body, HttpException, HttpStatus, Injectable, NotFoundException, Param, Res } from '@nestjs/common';

import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users..interface';
import { createUserFromObject } from 'src/auth/utils/user.utils';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {  
    try {
      const user = this.userRepository.create({...createUserDto});
      await user.save();
  
      delete user.password;
      return user;

    } catch (error) {
      console.error('Error in user creation:', error);
      const errorMessage = error.message || 'User creation failed';
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findUsers(){
    return await this.userRepository.find();
  }

  async showById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {id}
    });

    if(!user) throw new NotFoundException(`User with ID: ${id} not found`)

    delete user.password;
    return user;
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<any> {
    try {
      let foundUser = await this.userRepository.findOneBy({
        id: id
      });
  
      if (!foundUser) {
        throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
      }
  
      if (data.password) await foundUser.hashPasswordOnUpdate(); // Check if the password is being updated
      foundUser = createUserFromObject({ ...foundUser, ...data }); // Merge other properties
  
    
      const updatedUser = await this.userRepository.save(foundUser);
      return {
        message: 'Successfully Updated',
        data: updatedUser
      };
  
    } catch (error) {
      const errorMessage = error.message || 'User update failed';
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async deleteUser(id: number): Promise<any>{
    let foundUser = await this.userRepository.findOneBy({
      id: id
    })

    if (!foundUser) {
      throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
    return {
      message: 'Successfully deleted',
      data: foundUser
    };
  }
}