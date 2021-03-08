import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ActionDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    url: string

    @ApiProperty()
    method: string

    @ApiProperty()
    description: string
}