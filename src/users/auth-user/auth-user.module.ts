import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { GuestModule } from '../guest/guest.module';

@Module({
  imports: [GuestModule],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
