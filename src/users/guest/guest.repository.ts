import { BaseMemoryRepository } from '@app/core';
import { GuestEntity } from './guest.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestRepository extends BaseMemoryRepository<GuestEntity> {
  public findByEmail(email: string): Promise<GuestEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return Promise.resolve(user);
  }
}
