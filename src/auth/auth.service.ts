import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { User } from '../users/users.entity'
import { UserRO } from '../users/users.ro'
import { RegistrationStatus } from './interfaces/registrationStatus.interface'
import { CreateUserDto } from '../users/dto/users.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    private readonly logger = new Logger(AuthService.name)

    async register(user: Omit<CreateUserDto, 'roles'>) {
        let status: RegistrationStatus = {
            success: true,
            massage: 'User register'
        }
        try {
            return await this.usersService.register(user)
        } catch(error) {
            status = { success: false, massage: error }
            console.log('Error', status)
        }
    }

    createToken(user: User) {
        const expiresIn = 3600
        const accessToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        )
        return {
            expiresIn,
            accessToken
        }
    }
    
    async validateUserToken(payload: JwtPayload): Promise<User> {
        return await this.usersService.findById(payload.id)
    }

    async validateUser(email: string, password: string): Promise<UserRO | any> {
        const user = await this.usersService.findByEmail(email)
        if (user && await user.comparePassword(password)) {
            this.logger.log('password check success')
            const { password, ...result } = user
            return result
        }
        return null
    }
}
