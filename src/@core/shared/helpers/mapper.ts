import { UserDto } from "src/domain/dtos/user/user.dto";
import { UserEntity } from '../../../domain/entities/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, name, role, active } = data;
    let userDto: UserDto = { id, username, name, role, active };
    return userDto;
};