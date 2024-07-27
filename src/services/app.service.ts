import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(username : string): string {
    return username + "!";
  }
}
