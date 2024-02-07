import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GuestRepository } from '../guest/guest.repository';
import { GuestEntity } from '../guest/guest.entity';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './auth-user.constants';
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class AuthUserService {
  constructor(private readonly guestRepository: GuestRepository) {}

  public async register(dto: CreateUserDto) {
    const { name, email, password } = dto;

    const guest = {
      email,
      name,
      role: 'admin',
      passwordHash: '',
    };

    const existUser = await this.guestRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new GuestEntity(guest).setPassword(password);

    return this.guestRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.guestRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    return this.guestRepository.findById(id);
  }
}
