import { IsString } from 'class-validator';

export class FileDeleteDto {
  @IsString()
  filePath: string;
}
