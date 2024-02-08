import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberController } from './email-subscriber.controller';
import { MailModule } from '../mail/mail.module';
import { getRabbitMQOptions } from '@app/helpers';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService, EmailSubscriberRepository],
})
export class EmailSubscriberModule {}
