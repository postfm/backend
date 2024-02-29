import 'multer';
import { Express } from 'express';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileStoreService } from './file-store.service';
import { FileDeleteDto } from './dto/file-delete.dto';
import { FileTypeValidationPipe } from 'libs/pipes/file-type-validation.pipe';

@Controller('files')
export class FileStoreController {
  constructor(private readonly fileStoreService: FileStoreService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('photo'))
  public async uploadFile(
    @UploadedFile(FileTypeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.fileStoreService.saveFile(file);
  }

  @Post('delete')
  public async deleteFile(@Body() filePath: FileDeleteDto) {
    return this.fileStoreService.deleteFile(filePath.filePath);
  }
}
