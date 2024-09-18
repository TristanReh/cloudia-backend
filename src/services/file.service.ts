import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { File, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import FileObject from 'src/models/FileObject';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async uploadFile (email : string, file : Express.Multer.File): Promise<void> {
    await this.prisma.file.create({
        data: {
            owner: {
                connect: {
                    email
                }
            }, 
            filesize: file.size,
            mimetype: file.mimetype,
            buffer: file.buffer,
            filename: file.originalname
        }
    })
  }

  async getFiles(email: string): Promise<FileObject[]> {
    return await this.prisma.file.findMany({
        select: {id: true, filename: true, filesize: true, uploaddate: true, ownerId: true, mimetype: true, owner: false, buffer: false},
        where: {ownerId: email}
    })
  }

  async getFile(id: string): Promise<{buffer: Buffer, filename: string, mimetype: string, ownerId: string}> {
    return await this.prisma.file.findUnique({
            select: {buffer: true, filename: true, mimetype: true, ownerId: true},
            where: {id}
    })
  }
}
