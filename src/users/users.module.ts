import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth-user/auth-user.module';
import { GuestModule } from './guest/guest.module';
import { AuthUserController } from './auth-user/auth-user.controller';
import { AuthUserService } from './auth-user/auth-user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthUserModule, GuestModule],
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtService],
})
export class UsersModule {}
