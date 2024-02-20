import 'multer';
import { Express } from 'express';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStoreService } from './file-store.service';
import { FileDeleteDto } from './dto/file-delete.dto';

@Controller('files')
export class FileStoreController {
  constructor(private readonly fileStoreService: FileStoreService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('photo'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('delete')
  public async deleteFile(@Body() filePath: FileDeleteDto) {
    return this.fileStoreService.deleteFile(filePath.filePath);
  }
}
