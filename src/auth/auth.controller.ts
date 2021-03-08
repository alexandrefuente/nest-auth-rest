import { Controller, Post, Res, Body, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RolesService } from '../roles/roles.service'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/users.dto'
import { LoginDto } from './login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    async register(@Res() res: any, @Body() createUserDto: CreateUserDto) {
        const { roles, ...userData } = createUserDto
        const result = await this.authService.register(userData)
        if (!result) {
            return res.status(HttpStatus.BAD_REQUEST).json(result)
        }
        if (roles.length) {
            const assignIn = await this.rolesService.getIdsRole(roles)
            this.usersService.assign(result, assignIn)
        }
        return res.status(HttpStatus.OK).json({ 
            'user': 
            { id: result.uuid, 
              firstName: result.firstName, 
              email: result.email 
            }
        })
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Res() res: any, @Body() login: LoginDto) {
        const user = await this.authService.validateUser(login.email, login.password)
        if (!user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'User not Found'
            })
        }
        const token = this.authService.createToken(user)
        return res.status(HttpStatus.OK).json(token)
    }
}
