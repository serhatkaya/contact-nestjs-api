import { UserController } from '@api/controllers/users/user.controller';
import { EncryptionService } from '@core/services/encryption.service';
import { UsersService } from '@infrastructure/services/users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService, EncryptionService],
    controllers: [UserController],
    exports: [UsersService]
})
export class UsersModule { }