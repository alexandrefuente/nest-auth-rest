import { HttpException, HttpStatus } from '@nestjs/common'
import { User } from '../users.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from '../dto/users.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser = async (user: Omit<CreateUserDto, 'roles'>) => {
        return await this.save(user)
    }

    getAllUsers = async() => {
        return await this.createQueryBuilder()
            .select(['us.id', 'us.firstName', 'us.lastName', 'us.email', 'us.isActive'])
            .from(User, 'us')
            .getMany()
    }

    getUser = async (id: number) => {
        return await this.findOne(id, { relations: ['roles'] })
    }

    updateUser = async (id: number, updateUserDto: Omit<CreateUserDto, 'roles'>) => {
        const user = await this.findOne(id)
        if (!user) {
            throw new HttpException(
                'User not found',
                HttpStatus.NOT_FOUND
            )
        }
        const userUpdate = this.merge(
            user,
            updateUserDto
        )
        return this.save(userUpdate)
    }
}