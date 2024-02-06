import { Module } from '@nestjs/common';
import { GuestRepository } from './guest.repository';

@Module({
  providers: [GuestRepository],
  exports: [GuestRepository],
})
export class GuestModule {}
