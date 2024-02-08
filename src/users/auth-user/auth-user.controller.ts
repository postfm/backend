import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@app/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login.user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { GuestEntity } from '../guest/guest.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guards';

interface RequestWithUser {
  user?: GuestEntity;
}
@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authUserService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authUserService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authUserService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authUserService.createUserToken(user);
  }
}
