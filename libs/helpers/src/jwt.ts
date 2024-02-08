import { TokenPayload, UserInterface } from '@app/types';

export function createJWTPayload(user: UserInterface): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}
