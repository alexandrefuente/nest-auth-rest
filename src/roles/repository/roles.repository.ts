import { HttpException, HttpStatus } from '@nestjs/common'
import { Roles } from '../roles.entity'
import { EntityRepository, In, Repository } from 'typeorm'
import { RolesDto } from '../dto/roles.dto'

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {

    getRoles =  async () => {
        return this.find()
    }

    createRole = async (roles: RolesDto) => {
        return await this.save(roles)
    }

    show = async (id: number) => {
        return this.findOneOrFail(id)
    }

    updateRole = async (id: number, role: RolesDto) => {
        const roleUpdate = await this.show(id)
        if (!roleUpdate) {
            throw new HttpException(
                'Role not found',
                HttpStatus.NOT_FOUND
            )
        }
        roleUpdate.name = role.name
        return this.save(roleUpdate)
    }

    getMany = async (roles: string[]) => {
        return await this.find({
            id: In(roles),
        })
    }
}