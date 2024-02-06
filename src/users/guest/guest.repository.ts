import { BasePostgresRepository } from '@app/core';
import { GuestEntity } from './guest.entity';
import { Injectable } from '@nestjs/common';
import { UserInterface } from '@app/types';
import { PrismaClientService } from '@app/models';

@Injectable()
export class GuestRepository extends BasePostgresRepository<
  GuestEntity,
  UserInterface
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, GuestEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<GuestEntity | null> {
    const document = await this.client.users.findFirst({
      where: {
        email: email,
      },
    });
    return this.createEntityFromDocument(document);
  }
}
