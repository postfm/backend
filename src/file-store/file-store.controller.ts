import 'multer';
import { Express } from 'express';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStoreService } from './file-store.service';

@Controller('files')
export class FileStoreController {
  constructor(private readonly fileStoreService: FileStoreService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('photo'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileStoreService.saveFile(file);
  }
}
