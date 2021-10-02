import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty() @ApiProperty() @IsEmail() username: string;
    @IsNotEmpty() @ApiProperty() @IsUUID() id: string;
    @IsNotEmpty() @ApiProperty() password: string;
    @IsNotEmpty() @ApiProperty() name: string;
}