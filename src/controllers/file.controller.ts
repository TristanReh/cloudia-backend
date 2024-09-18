import { Controller, ForbiddenException, Get, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '@prisma/client';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { TokenEmail } from 'src/middlewares/authentication.middleware';
import FileObject from 'src/models/FileObject';
import { FileService } from 'src/services/file.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@TokenEmail() email, @UploadedFile() file: Express.Multer.File): Promise<void> {
    console.log(email)
    await this.fileService.uploadFile(email, file)
    
  
  }

  @Get('files')
  async getFiles(@TokenEmail() email): Promise<FileObject[]> {
    return await this.fileService.getFiles(email)
  }

  @Get('file')
  async getFile(@TokenEmail() email, @Query('fileid') fileId): Promise<StreamableFile> {
     const file =  await this.fileService.getFile(fileId)
     if (file.ownerId != email) throw new ForbiddenException("You dont have access to this file")
     return new StreamableFile(file.buffer,
      {
        type: file.mimetype,
        disposition: `attachment; filename=${file.filename}`
      }
     )
  }
}


