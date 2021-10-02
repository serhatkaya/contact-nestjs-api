import { Role } from "@domain/enums/role.enum";

export interface JwtPayload {
    username: string;
    name: string;
    role: Role;
}