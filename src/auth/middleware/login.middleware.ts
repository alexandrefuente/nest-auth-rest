import { Injectable, HttpException, HttpStatus, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        this.validateEmail(req.body.email)
        this.validatePassword(req.body.password)
        next()
    }

    protected validateEmail(email: string) {
        if (email === '' || email === undefined) {
            throw new HttpException(
                'Email is required',
                HttpStatus.BAD_REQUEST
            )
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new HttpException(
                'Email address is invalid ',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    protected validatePassword(password: string): any {
        if (password === '') {
            throw new HttpException(
                'Password is required',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}