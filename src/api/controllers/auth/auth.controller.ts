import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { LoginDto } from '@domain/dtos/auth/login.dto';
import { AuthService, LoginStatus, RegistrationStatus } from '@infrastructure/services/auth/auth.service';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiResult } from '@core/common/api-result';

@Controller('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    public async login(@Body() loginUserDto: LoginDto): Promise<ApiResult<LoginStatus>> {
        return new ApiResult<LoginStatus>(await this.authService.login(loginUserDto), true);
    }

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        const result:
            RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}
