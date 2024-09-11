import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { FileController } from './controllers/file.controller';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';

@Module({
  imports: [],
  controllers: [LoginController, FileController],
  providers: [PrismaService, UserService, LoginService],
})

export class CloudiaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(FileController);
  }
}
