import { IsEmail, IsString } from 'class-validator';
import { AuthUser } from '../auth-user.constants';

export class LoginUserDto {
  @IsEmail({}, { message: AuthUser.EmailNotValid })
  public email: string;

  @IsString()
  public password: string;
}
