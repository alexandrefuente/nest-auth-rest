import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Roles } from './roles.entity'
import { RolesDto } from './dto/roles.dto'


@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) {}

    @Get()
    async findAllRoles(@Req() req: any): Promise<Roles[]> {
        return this.rolesService.getRoles()
    }

    @Post()
    async create(@Body() role: RolesDto): Promise<Roles> {
        return this.rolesService.create(role)
    }

    @Get(':id')
    async show(@Param() id: number): Promise<Roles> {
        return this.rolesService.findOne(id)
    }

    @Put(':id')
    async update(@Body() role: RolesDto, @Param() id: number): Promise<Roles> {
        return this.rolesService.update(id, role)
    }
}
