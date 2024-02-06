import { UserInterface } from './user.interface';

export interface AuthUser extends UserInterface {
  passwordHash: string;
}
