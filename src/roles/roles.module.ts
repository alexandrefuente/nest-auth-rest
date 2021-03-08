import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { Roles } from './roles.entity'
import { RolesRepository } from './repository/roles.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, RolesRepository])
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
