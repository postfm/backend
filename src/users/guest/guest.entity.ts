import { AuthUser, UserRole } from '@app/types';
import { Entity } from '@app/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './guest.constants';

export class GuestEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
  }

  public async setPassword(password: string): Promise<GuestEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
