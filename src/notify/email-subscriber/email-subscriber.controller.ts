import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@app/types';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @RabbitSubscribe({
    exchange: 'guitar.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'guitar.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }
}
