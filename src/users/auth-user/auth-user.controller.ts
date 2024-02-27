import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@app/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login.user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authUserService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authUserService.verifyUser(dto);
    const userToken = await this.authUserService.createUserToken(verifiedUser);
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authUserService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate/:token')
  public async validate(@Param('token') token: string) {
    const existsUser = await this.authUserService.validateUserToken(token);
    return fillDto(UserRdo, existsUser);
  }
}
