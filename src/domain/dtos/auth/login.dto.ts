import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty() @ApiProperty() @IsEmail() readonly username: string;
    @IsNotEmpty() @ApiProperty() readonly password: string;
}