import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUserCredentials(
    email: string,
  ): Promise<{ email: string; password: string } | null> {
    return await this.prisma.user.findUnique({
      select: { email: true, password: true },
      where: { email },
    });
  }

  async doesUserExist(
    email : string,
  ): Promise<boolean> {
    return await this.prisma.user.findUnique({
      select: {email : true}, where: {email}
    }) != null
 
  }

  async createUser (email: string, password: string) : Promise<void> {
    await this.prisma.user.create({
      data: {email, password}
    })
  }
}
