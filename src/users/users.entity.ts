import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm'
import { Roles } from '../roles/roles.entity'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255, nullable: false })
    uuid: string

    @Column({ length: 155, nullable: false })
    firstName: string

    @Column({ length: 155, nullable: true })
    lastName: string

    @Column({ unique: true })
    email: string

    @Column({ length: 255, nullable: false })
    password: string

    @Column({ default: true })
    isActive: boolean

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(Type => Roles, roles => roles.user, { cascade: true, nullable: true })
    @JoinTable({ 
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roles_id', referencedColumnName: 'id' }
    })
    roles: Promise<Roles[]>


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hashSync(this.password, 10)
        return this.password
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password)
    }
}
