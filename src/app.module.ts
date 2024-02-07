import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { FileStoreConfig, applicationConfig, jwtConfig } from '@app/config';
import { FileStoreModule } from './file-store/file-store.module';

const ENV_USER_FILE_PATH = 'src/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig, FileStoreConfig],
      envFilePath: ENV_USER_FILE_PATH,
    }),
    ProductsModule,
    UsersModule,
    FileStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
