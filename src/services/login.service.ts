import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import AuthenticationPayload from 'src/models/AuthenticationPayload';
import { sign } from 'jsonwebtoken';
import { isValidEmail } from 'src/utils/email.util';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  async checkCredentials(email: string, password: string): Promise<void> {
    const credentials = await this.userService.getUserCredentials(email);
    if (credentials == null) throw new NotFoundException('User not found');
    else if (credentials.password != password)
      throw new UnauthorizedException('Password provided is wrong');
  }

  generateToken(email: string): AuthenticationPayload {
    const token = sign({ email }, process.env.JWT_SECRET_KEY || null, {
      expiresIn: '1h',
    });
    if (!token)
      throw new InternalServerErrorException("Token couldn't be generated");
    return { access_token: token, refresh_token: '' };
  }

  async checkEmail(email : string): Promise<void> {
    if (!isValidEmail(email)) throw new BadRequestException('Email is not valid')
    if(await this.userService.doesUserExist(email)) throw new BadRequestException('Email is already registered')
  }
  
  async createUser(email: string, password : string): Promise<void>  {
    this.userService.createUser(email,password)
  }
}
