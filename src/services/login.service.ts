import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from "jsonwebtoken"
@Injectable()
export class LoginService {
    constructor(private readonly userService: UserService) {}

    async checkCredentials(email : string, password : string) : Promise<void> {
        let credentials = await this.userService.getUserCredentials(email);
        if (credentials == null) throw new NotFoundException("User not found")
        else if (credentials.password != password) throw new UnauthorizedException("Password provided is wrong")
    }

    generateToken(email: string) : { access_token: string } {
        var token = jwt.sign({ email }, process.env.JWT_SECRET_KEY || null, { expiresIn: '1h'});
        if (!token) throw new InternalServerErrorException("Token couldn't be generated");
        return { access_token: token };
    }
}
