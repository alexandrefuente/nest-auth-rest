import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { User } from '../users/users.entity'
import { Actions } from '@/actions/actions.entity'

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    name: string

    @ManyToMany(Type => User, user => user.roles)
    user: Promise<User[]>

    @ManyToMany(Type => Actions, actions => actions.roles, { cascade: true, nullable: true })
    @JoinTable({
        name: 'roles_actions',
        joinColumn: { name: 'roles_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'actions_id', referencedColumnName: 'id' }
    })
    actions: Promise<Actions[]>
}