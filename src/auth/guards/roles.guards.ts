import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { User } from '../../users/users.entity'

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor(
        private readonly reflector: Reflector,
    ) {} 

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const user: User = request.user
        //Validate user has Role to access
        const hasRole = async() => {
            let hasPermission
            (await user.roles).some(role => !!roles.find(item => {
                if (item.toLocaleLowerCase() === role.name.toLocaleLowerCase()) {
                    hasPermission = true
                }
            }))
            return hasPermission
        }
        return hasRole()
    }
}