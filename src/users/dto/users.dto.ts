import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    readonly id: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    readonly password: string

    @ApiProperty()
    readonly isActive: boolean

    @ApiProperty()
    uuid: string

    @ApiProperty()
    roles: string[]
}
