import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
    @IsOptional()
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

    @IsOptional()
    @MinLength(6)
    @ApiProperty()
    readonly password: string

    @ApiProperty()
    readonly isActive: boolean

    @IsOptional()
    @ApiProperty()
    uuid: string

    @ApiProperty()
    roles: string[]
}
