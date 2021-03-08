import { Body, Controller, Get, Param, Post, Put, Req, Res, HttpStatus } from '@nestjs/common'
import { Actions } from './actions.entity'
import { Roles } from '@/roles/roles.entity'
import { ActionsService } from './actions.service'
import { RolesService } from '../roles/roles.service'
import { ActionDto } from './dto/actions.dto'
import { ActionAssingDto } from './dto/actions-assign.dto'

@Controller('actions')
export class ActionsController {
    constructor(
        private readonly actionsService: ActionsService,
        private readonly rolesService: RolesService
    ) {}

    @Get()
    async getAllActions(@Req() req: any): Promise<Actions[]> {
        return this.actionsService.getActions()
    }

    @Post()
    async create(@Res() res: any, @Body() actionDto: ActionDto): Promise<Actions> {
        const resActions = await this.actionsService.createAction(actionDto)
        // if (roles.length) {
        //     const assignIn = await this.rolesService.findOne(roles)
        //     this.rolesService.assign(assignIn, resActions)
        // }
        return res.status(HttpStatus.OK).json({ 'actions': { resActions } })
    }

    @Get(':id')
    async getAction(@Param() id: number): Promise<Actions> {
        return this.actionsService.getAction(id)
    }

    @Put(':id')
    async update(@Res() res: any, @Param() id: number, @Body() actionDto: ActionDto): Promise<Actions> {
        const resActions =  this.actionsService.updateAction(id, actionDto)
        return res.status(HttpStatus.OK).json({ 'actions': { resActions } })
    }

    @Post('assign')
    async assignIn(@Res() res: any, @Body() actionDto: ActionAssingDto): Promise<Roles> {
        const { roles, actions } = actionDto
        let result: boolean = false
        if (actions.length) {
            const assignIn = await this.rolesService.findOne(roles)
            const assignInActions = await this.actionsService.getIdsActions(actions)
            result = await this.rolesService.assign(assignIn, assignInActions)
        }
        return res.status(HttpStatus.OK).json({ 'actions': { result } })
    }
}
