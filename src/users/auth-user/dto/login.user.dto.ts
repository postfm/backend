import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUser } from '../auth-user.constants';

export class LoginUserDto {
  @IsEmail({}, { message: AuthUser.EmailNotValid })
  public email: string;

  @IsString()
  @MinLength(6, { message: 'Minimum name length no less than 6 characters' })
  @MaxLength(12, { message: 'Maximum name length no more than 12 characters' })
  public password: string;
}
