import { ApiResult } from '@core/common/api-result';
import { EncryptionService } from '@core/services/encryption.service';
import { toUserDto } from '@core/shared/helpers/mapper';
import { LoginDto } from '@domain/dtos/auth/login.dto';
import { UpdateUserDto } from '@domain/dtos/user/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/domain/dtos/user/create-user.dto';
import { UserDto } from 'src/domain/dtos/user/user.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
        private encryptionService: EncryptionService) { }


    public async getAll() {
        return await this.repo.find();
    }

    get repository(): Repository<UserEntity> {
        return this.repo;
    }

    async updateAsync(updateUser: UpdateUserDto) {
        try {
            const user = await this.repo.findOne({ where: { id: updateUser.id } });
            if (user) {

                Object.keys(updateUser).forEach(r => {
                    if (r != 'id' && r != 'password') user[r] = updateUser[r]
                    if (r == 'password') user.password = this.encryptionService.encrypt(updateUser.password);
                });
                await this.repo.save(user);

                return new ApiResult<UserDto>(new UserDto(user), true);


            } else {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
        } catch (err) {
            return new ApiResult<UserDto>(null, false, "Error occurred", err);
        }
    }

    async findOne(options?: FindOneOptions<UserEntity>): Promise<UserDto> {
        const user = await this.repo.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
        const user = await this.repo.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords    
        const areEqual = this.encryptionService.validateString(password, user.password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({
            where: { username }
        });
    }
    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, name } = userDto;

        // check if the user exists in the db    
        const userInDb = await this.repo.findOne({
            where: { username }
        });

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const userToSave = {
            username: username,
            password: this.encryptionService.encrypt(password),
            name: name
        }

        const user: UserEntity = await this.repo.create(userToSave);
        await this.repo.save(user);
        return toUserDto(user);
    }
}