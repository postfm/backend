import { BasePostgresRepository } from '@app/core';
import { Injectable } from '@nestjs/common';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@app/types';
import { PrismaClientService } from '@app/models';

@Injectable()
export class EmailSubscriberRepository extends BasePostgresRepository<
  EmailSubscriberEntity,
  Subscriber
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, EmailSubscriberEntity.fromObject);
  }

  public async findByEmail(
    email: string,
  ): Promise<EmailSubscriberEntity | null> {
    throw new Error('Not implemented');
  }
}
