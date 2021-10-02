import { EncryptionService } from '@core/services/encryption.service';
import { UsersService } from '@infrastructure/services/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/domain/dtos/user/create-user.dto';
import { LoginDto } from '@domain/dtos/auth/login.dto';
import { UserDto } from 'src/domain/dtos/user/user.dto';
import { JwtPayload } from '@core/common/jwt-payload.i';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private encryptionService: EncryptionService, private jwtService: JwtService) { }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async register(userDto: CreateUserDto):
        Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }

    async login(loginUserDto: LoginDto): Promise<LoginStatus> {
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token    
        const token = this._createToken(user);

        return {
            username: user.username, ...token,
        };
    }

    private _createToken({ username, name, role }: UserDto): any {
        const user: JwtPayload = { username, name, role };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        };
    }

    public async getUserFromAuthenticationToken(token: string) {
        // const payload: TokenPayload = this.jwtService.verify(token, {
        //     secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        // });
        // if (payload.userId) {
        //     return this.usersService.getById(payload.userId);
        // }
    }
}

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface LoginStatus {
    username: string;
    accessToken: any;
    expiresIn: any;
}
