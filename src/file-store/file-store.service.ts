import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FileStoreConfig } from '@app/config';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import * as dayjs from 'dayjs';
import { unlink } from 'node:fs';

@Injectable()
export class FileStoreService {
  private readonly logger = new Logger(FileStoreService.name);

  constructor(
    @Inject(FileStoreConfig.KEY)
    private readonly config: ConfigType<typeof FileStoreConfig>,
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);
      const destinationFile = this.getDestinationFilePath(
        `${filename}.${fileExtension}`,
      );

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  public deleteFile(file: string): void {
    unlink(file, (err) => {
      if (err) {
        this.logger.error(`Error while saving file: ${err.message}`);
      } else {
        console.log(`${file} was deleted`);
      }
    });
  }
}
