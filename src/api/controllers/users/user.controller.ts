import { ApiResult, DataApiResult } from '@core/common/api-result';
import { EncryptionService } from '@core/services/encryption.service';
import { CreateUserDto } from '@domain/dtos/user/create-user.dto';
import { UpdateUserDto } from '@domain/dtos/user/update-user.dto';
import { UserDto } from '@domain/dtos/user/user.dto';
import { UsersService } from '@infrastructure/services/users.service';
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('User')
export class UserController {
    constructor(private serv: UsersService, private encryption: EncryptionService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async getAll(): Promise<DataApiResult<UserDto>> {
        var users = await this.serv.getAll();

        var result = new DataApiResult<UserDto>();

        result.result = users.map(r => new UserDto(r));
        result.succeed = true;
        return result;
    }

    @Get('ById')
    @UseGuards(AuthGuard('jwt'))
    public async getById(@Query('id') id: string): Promise<ApiResult<UserDto>> {
        var user = await this.serv.findOne({
            where: { id: id }
        })

        return new ApiResult<UserDto>(user, true);
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    public async updateUser(@Body() user: UpdateUserDto): Promise<ApiResult<UserDto>> {

        return await this.serv.updateAsync(user);
    }
}
