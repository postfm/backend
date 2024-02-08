import { RefreshTokenEntity } from './refresh-token.entity';
import { BasePostgresRepository } from '@app/core';
import { PrismaClientService } from '@app/models';
import { JwtToken } from '@app/types';
import { NotFoundException } from '@nestjs/common';

export class RefreshTokenRepository extends BasePostgresRepository<
  RefreshTokenEntity,
  JwtToken
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, RefreshTokenEntity.fromObject);
  }

  public async deleteTokenById(id: string): Promise<void> {
    await this.client.tokens.delete({
      where: {
        id,
      },
    });
  }

  public async findByTokenId(tokenId: string): Promise<JwtToken | null> {
    const document = await this.client.tokens.findFirst({
      where: {
        tokenId,
      },
    });

    if (!document) {
      throw new NotFoundException(`User with id ${tokenId} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteExpiredTokens(): Promise<void> {
    //   await this.client.tokens.delete({
    //     where: {
    //       expiresIn: lt:{ new Date()},
    //     },
    //   });
  }
}
