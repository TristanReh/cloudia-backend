import { BadRequestException, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { Response } from 'express';
import AuthenticationPayload from 'src/models/AuthenticationPayload';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const email: string = request.headers['email'];
    const password: string = request.headers['password'] || '';
    
    let payload: AuthenticationPayload;

    if (!email) {
      throw new BadRequestException('Please provide both email and password');
    }

    try {
      await this.loginService.checkCredentials(email, password);
      payload = this.loginService.generateToken(email);
    } catch (err) {
      throw err;
    }

    response.cookie('access_token', payload.access_token);
  }

  @Post('register')
  async register(
    @Req() request: Request,
  ): Promise<void> {
    const email: string = request.headers['email'];
    const password: string = request.headers['password'];
    if (!password || password == '') throw new BadRequestException('No password provided')
    try {
      await this.loginService.checkEmail(email)
      await this.loginService.createUser(email,password)
    } catch (err) {
        throw err;
      
    }
  }
}
