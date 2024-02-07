import { BasePostgresRepository } from '@app/core';
import { GuestEntity } from './guest.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async save(entity: GuestEntity): Promise<GuestEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.users.create({
      data: {
        ...pojoEntity,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.users.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<GuestEntity> {
    const document = await this.client.users.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
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
