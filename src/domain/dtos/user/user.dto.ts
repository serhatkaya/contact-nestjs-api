import { UserEntity } from "@domain/entities/user.entity";
import { Role } from "@domain/enums/role.enum";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UserDto {
    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.role = user.role;
        this.active = user.active;
    }
    @IsNotEmpty()
    @IsUUID()
    id: string;
    @IsNotEmpty() username: string;
    @IsNotEmpty() name: string;
    @IsNotEmpty() role: Role;
    @IsNotEmpty() active: boolean;
}