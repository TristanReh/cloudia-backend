import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';

@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void  { }
}
