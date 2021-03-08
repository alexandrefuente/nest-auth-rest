import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    readonly password: string
}