import { BadRequestException, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    async login(@Req() request: Request, @Res({passthrough: true}) response : Response) : Promise<void> {
        let email : string = request.headers["email"];
        let password : string = request.headers["password"] || "";

        if (!email) {
            throw new BadRequestException('Please provide both email and password');
        }
      
        try {
            await this.loginService.checkCredentials(email, password);
            var payload = await this.loginService.generateToken(email);
        } catch (err) {
            throw err;
        }

        response.cookie("access_token", payload.access_token);
    }
}

