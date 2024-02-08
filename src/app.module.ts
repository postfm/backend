import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { applicationConfig, jwtConfig, rabbitConfig } from '@app/config';
import { FileStoreModule } from './file-store/file-store.module';
import { NotifyModule } from './notify/notify.module';
import notifyConfig from '@app/config/notify/notify.config';
import fileStoreConfig from '@app/config/file-store/file-store.config';

const ENV_USER_FILE_PATH = 'src/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        jwtConfig,
        fileStoreConfig,
        notifyConfig,
        rabbitConfig,
      ],
      envFilePath: ENV_USER_FILE_PATH,
    }),
    ProductsModule,
    UsersModule,
    FileStoreModule,
    NotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
