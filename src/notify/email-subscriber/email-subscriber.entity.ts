import { Entity } from '@app/core';
import { Subscriber } from '@app/types';

export class EmailSubscriberEntity
  implements Subscriber, Entity<string, Subscriber>
{
  public email: string;
  public name: string;
  public password: string;

  public toPOJO() {
    return {
      email: this.email,
      name: this.name,
      password: this.password,
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;

    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity().populate(data);
  }
}
