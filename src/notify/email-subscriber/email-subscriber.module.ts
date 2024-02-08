import { Module } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Module({
  providers: [EmailSubscriberService, EmailSubscriberRepository],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
