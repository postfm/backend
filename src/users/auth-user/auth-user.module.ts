import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { GuestModule } from '../guest/guest.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '@app/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    GuestModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtAccessStrategy],
})
export class AuthUserModule {}
