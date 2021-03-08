import { Controller, Get, UseGuards, Req, Res, Put, Param, HttpStatus, HttpException, Body } from '@nestjs/common'
import { User } from './users.entity'
import { UsersService } from './users.service'
import { RolesService } from '../roles/roles.service'
import { UpdateUserDto } from './dto/updateUser.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guards'
import { hasRoles } from '../auth/decorators/roles.decorator'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService
    ) {}

    @Get()
    @hasRoles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAllUsers(@Req() req: any): Promise<User[]> {
        // console.log('User', req.user.id)
        return await this.usersService.getAllUsers()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getUser(@Res() res: any, @Param() id: number): Promise<User> {
        const user = await this.usersService.findById(id)
        if (!user) {
            throw new HttpException(
                'User not found',
                HttpStatus.NOT_FOUND
            )
        }
        return res.status(HttpStatus.OK).json({ 'user': { user } })
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Res() res: any, @Param() id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const { roles, ...userData } = updateUserDto
        const user = await this.usersService.update(id, userData)
        if (roles.length) {
            const assignIn = await this.rolesService.getIdsRole(roles)
            this.usersService.assign(user, assignIn)
        }
        return res.status(HttpStatus.OK).json({ 'user': { user } })
    }
}
