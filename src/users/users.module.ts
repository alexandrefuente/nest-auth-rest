import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from '../roles/roles.module'
import { User } from './users.entity'
import { UserRepository } from './repository/user.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
