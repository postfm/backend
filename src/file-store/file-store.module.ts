import { Module } from '@nestjs/common';
import { FileStoreService } from './file-store.service';
import { FileStoreController } from './file-store.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

const SERVE_ROOT = '/store';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          'file-store.uploadDirectory',
        );

        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],
  providers: [FileStoreService],
  controllers: [FileStoreController],
})
export class FileStoreModule {}
