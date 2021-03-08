import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { RolesModule } from '../roles/roles.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { LoginMiddleware } from './middleware/login.middleware'

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: 'Admin',
      signOptions: { expiresIn: 3600 },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  /**
   * This is middleware is necessary to validade if the email and password
   * is filled, because the Guard execute before de class-validation no LoginDto
   * @param userContext 
   */
  configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(LoginMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST })
  }
}
