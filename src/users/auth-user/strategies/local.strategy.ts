import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

import { UserInterface } from '@app/types';
import { AuthUserService } from '../auth-user.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthUserService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<UserInterface> {
    return this.authService.verifyUser({ email, password });
  }
}
