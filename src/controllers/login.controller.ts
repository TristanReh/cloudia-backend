import { BadRequestException, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    async login(@Req() request: Request) : Promise<{ access_token: string }> {
        let email : string = request.headers["email"]
        let password : string = request.headers["password"]

        if (!email || !password) {
            throw new BadRequestException('Please provide both email and password');
        }
      
        try {
            await this.loginService.checkCredentials(email, password);
        } catch (err) {
            throw err;
        }

        try {
            return await this.loginService.generateToken(email);
        } catch (err) {
            throw err;
        }
    }
}
