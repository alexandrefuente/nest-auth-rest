import { HttpException, HttpStatus } from '@nestjs/common'
import { EntityRepository, In, Repository } from 'typeorm'
import { Actions } from '../actions.entity'
import { ActionDto } from '../dto/actions.dto'

@EntityRepository(Actions)
export class ActionsRepository extends Repository<Actions> {
    getAllActions = async () => {
        return await this.find()
    }

    getAction = async (id: number) => {
        return await this.findOne(id)
    }

    createActions = async (actions: ActionDto) => {
        return this.save(actions)
    }

    updateActions = async (id: number, actionsDto: ActionDto) => {
        const actions = await this.getAction(id)
        if (!actions) {
            throw new HttpException(
                'Action not found',
                HttpStatus.NOT_FOUND
            )
        }
        const actionUpdate = this.merge(
            actions,
            actionsDto
        )
        return this.save(actionUpdate)
    }
    
    getMany = async (actions: string[]) => {
        return await this.find({
            id: In(actions)
        })
    }
}