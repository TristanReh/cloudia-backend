import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [PrismaService, UserService, LoginService],
})
export class CloudiaModule {}
