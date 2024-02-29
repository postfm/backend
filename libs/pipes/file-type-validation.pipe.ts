import { extension } from 'mime-types';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ALLOWED_EXTENSIONS } from '@app/types/pipe.constants';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const fileExtension = extension(value.mimetype);
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException('Wrong file mimetype');
    }

    return value;
  }
}
