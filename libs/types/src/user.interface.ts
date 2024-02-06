import { UserRole } from './user-role.enum';

export interface UserInterface {
  id?: string;
  email: string;
  name: string;
  role: string;
  passwordHash: string;
}
