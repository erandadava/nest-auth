import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto)
        const payload = {
            userId: user.id,
        };

        return {
            message: "Successfully Authorize",
            data:{
                email: user.email,
                access_token: this.jwtService.sign(payload)
            }
        }
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<User>  {
        const {email, password} = authLoginDto;

        const user = await this.usersService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
