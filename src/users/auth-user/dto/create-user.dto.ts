import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUser } from '../auth-user.constants';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Minimum name length no less than 1 characters' })
  @MaxLength(15, { message: 'Maximum name length no more than 15 characters' })
  public name: string;

  @IsEmail({}, { message: AuthUser.EmailNotValid })
  public email: string;

  @IsString()
  @MinLength(6, { message: 'Minimum name length no less than 6 characters' })
  @MaxLength(12, { message: 'Maximum name length no more than 12 characters' })
  public password: string;
}
