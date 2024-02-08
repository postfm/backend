import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [EmailSubscriberModule],
})
export class NotifyModule {}
