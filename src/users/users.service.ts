import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './repository/user.repository'
import { User } from './users.entity'
import { Roles } from '@/roles/roles.entity'
import { CreateUserDto } from './dto/users.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { DeleteResult } from 'typeorm'
const { v4: uuidv4 } = require('uuid')

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers()
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userRepository.createQueryBuilder('user').where("user.email = :email", { email: userEmail }).getOne()
    }

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.getUser(id)
    }

    async create(userDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(userDto)
    }

    async update(id: number, updateUserDto: Omit<UpdateUserDto, 'roles'>): Promise<User> {
        return await this.userRepository.updateUser(id, updateUserDto)
    }

    async delete(id: number): Promise<DeleteResult> {
        /**
         *  @Todo define if change the status of user or delete
         *   const user = await this.findById(id)
         *   console.log('user', user)
         *   user.isActive = user.isActive ? true : false
         *   return this.userRepository.save(user)
         */
      
        return this.userRepository.delete(id)
    }

    async register(userDto: Omit<CreateUserDto, 'roles'>): Promise<User> {
        let user = await this.findByEmail(userDto.email)
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST
            )
        }
        //Set a UUID to User
        userDto.uuid = uuidv4()
        user = await this.userRepository.create(userDto)
        return await this.userRepository.save(user)
    }

    async assign(user: User, roles: Roles[]) : Promise<Boolean> {
        try {
            user.roles = Promise.resolve(roles)
            await this.userRepository.save(user)
            return true
        } catch(error) {
            console.error('error', error)
            return false
        }
    }
}
