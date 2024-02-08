import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { NotifyService } from './notify.service';
import { getRabbitMQOptions } from '@app/helpers';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
