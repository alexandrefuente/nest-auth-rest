import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Actions } from './actions.entity'
import { Roles } from '../roles/roles.entity'
import { ActionsRepository } from './repository/actions.repository'
import { ActionDto } from './dto/actions.dto'

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(Actions)
        private readonly actionsRepository: ActionsRepository
    ) {}

    getActions(): Promise<Actions[] | null> {
        return this.actionsRepository.getAllActions()
    }

    getAction(id: number): Promise<Actions | null> {
        return this.actionsRepository.getAction(id)
    }

    createAction(actionDto: ActionDto): Promise<Actions> {
        return this.actionsRepository.createActions(actionDto)
    }

    updateAction(id: number, actionDto: ActionDto): Promise<Actions> {
        return this.actionsRepository.updateActions(id, actionDto)
    }

    getIdsActions(actions: string[]): Promise<Actions[]> {
        return this.actionsRepository.getMany(actions)
    }
}
