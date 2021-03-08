import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Roles } from './roles.entity'
import { Actions } from '../actions/actions.entity'
import { RolesRepository } from './repository/roles.repository'
import { RolesDto } from './dto/roles.dto'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly rolesRepository: RolesRepository
    ) {}

    async getRoles(): Promise<Roles[]| null> {
        return await this.rolesRepository.getRoles()
    }

    async create(roleDto: RolesDto): Promise<Roles> {
        return await this.rolesRepository.createRole(roleDto)
    }

    async findOne(id: number): Promise<Roles| null> {
        const role = this.rolesRepository.show(id)
        if (!role) {
            throw new NotFoundException('Role not found')
        }
        return role
    }

    async update(id: number, roleDto: RolesDto): Promise<Roles> {
        return await this.rolesRepository.updateRole(id, roleDto)
    }

    async getIdsRole(roles: string[]): Promise<Roles[]> {
        return await this.rolesRepository.getMany(roles)
    }

    async assign(roles: Roles, actions: Actions[]): Promise<boolean> {
        try {
            roles.actions = Promise.resolve(actions);
            await this.rolesRepository.save(roles);

            return true;
        } catch (e) {
            return false;
        }
    }
}
