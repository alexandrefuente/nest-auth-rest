import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Roles } from '../roles/roles.entity'

@Entity()
export class Actions {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    url: string

    @Column({ nullable: true })
    method: string

    @Column({ nullable: true, type: 'text' })
    description: string

    @ManyToMany(Type => Roles, roles =>  roles.actions)
    roles: Promise<Roles[]>
}