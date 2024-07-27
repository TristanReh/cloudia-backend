import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from 'src/services/app.service';

@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void  { }
}
