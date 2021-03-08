import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ActionAssingDto {
    @ApiProperty()
    @IsNotEmpty()
    actions: string[]

    @ApiProperty()
    @IsNotEmpty()
    roles: number
}