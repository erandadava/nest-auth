import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  public email: string;
  public password: string;
}