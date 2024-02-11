import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
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
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload, UserInterface } from '@app/types';
import { ConfigService } from '@nestjs/config';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class AuthUserService {
  private readonly logger = new Logger(AuthUserService.name);

  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  public async createUserToken(user: UserInterface): Promise<Token> {
    const secretOrKey = this.configService.get<string>('jwt.accessTokenSecret');
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: secretOrKey,
      });
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async validateUserToken(token: string): Promise<UserRdo> {
    const secretOrKey = this.configService.get<string>('jwt.accessTokenSecret');
    try {
      const isValid = this.jwtService.verify(token, {
        secret: secretOrKey,
      });
      return isValid;
    } catch (error) {
      this.logger.error('[Token validation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при валидации токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
