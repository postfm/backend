import { GuestRepository } from './../guest/guest.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GuestEntity } from '../guest/guest.entity';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './auth-user.constants';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, UserInterface } from '@app/types';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@app/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@app/helpers';

@Injectable()
export class AuthUserService {
  private readonly logger = new Logger(AuthUserService.name);

  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
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

  public async getUserByEmail(email: string) {
    const existUser = await this.guestRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async createUserToken(user: UserInterface): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
