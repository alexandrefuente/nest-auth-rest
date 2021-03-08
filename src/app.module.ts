import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { ActionsModule } from './actions/actions.module'

import { config } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
    ActionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
