import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const ENV_USER_FILE_PATH = 'src/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_USER_FILE_PATH,
    }),
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
