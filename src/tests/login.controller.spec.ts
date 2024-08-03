import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../controllers/login.controller';
import { LoginService } from '../services/login.service';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../services/user.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [PrismaService, UserService, LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
