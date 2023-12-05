import { Injectable } from '@nestjs/common';

import { User } from './users.entity';
import { CreateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users..interface';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({...createUserDto});
    
    await user.save();

    delete user.password;
    return user;
  }
  
  async findUsers(){
    return await this.userRepository.find();
  }

  // async showById(id: number): Promise<User> {
  //   const user = await this.userRepository.findOne(id);

  //   delete user.password;
  //   return user;
  // }

  // async findById(id: number) {
  //   return await this.userRepository.findOne(id);
  // }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
 
}