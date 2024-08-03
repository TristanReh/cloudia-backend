import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

export const TokenEmail = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tokenEmail; // extract token from request
  },
);

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    if (!accessToken)
      throw new BadRequestException('AccessToken was not provided');

    verify(accessToken, process.env.JWT_SECRET_KEY, {}, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError)
          throw new ForbiddenException('Access token is expired');
        throw new BadRequestException("Couldn't verify access token");
      }
      req['tokenEmail'] = decoded['email'];
    });

    next();
  }
}
