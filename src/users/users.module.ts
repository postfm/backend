import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth-user/auth-user.module';
import { GuestModule } from './guest/guest.module';
import { AuthUserController } from './auth-user/auth-user.controller';
import { AuthUserService } from './auth-user/auth-user.service';
import { JwtService } from '@nestjs/jwt';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [AuthUserModule, GuestModule, NotifyModule],
  controllers: [AuthUserController],
  providers: [AuthUserService, JwtService],
})
export class UsersModule {}
