import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RolesDto {
    @ApiProperty()
    readonly id: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string
}