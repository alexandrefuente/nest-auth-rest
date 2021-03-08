import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from '../roles/roles.module'
import { Actions } from './actions.entity'
import { ActionsRepository } from './repository/actions.repository'
import { ActionsService } from './actions.service'
import { ActionsController } from './actions.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([Actions, ActionsRepository]),
        RolesModule
    ],
    providers: [ActionsService],
    exports: [ActionsService],
    controllers: [ActionsController]
})
export class ActionsModule {}
