import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty() @ApiProperty() @IsEmail() username: string;
    @IsNotEmpty() @ApiProperty() password: string;
    @IsNotEmpty() @ApiProperty() name: string;
}