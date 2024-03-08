import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create_user.dto';
import LoginUserService from '../application/login_user.service';
import RegisterUserService from '../application/register_user.service';
import LoginDto from '../dto/login_dto';
import { LOGIN_USER_USE_CASE, REGISTER_USER_SERVICE } from '../symbols';

@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USER_USE_CASE)
    private readonly loginUserService: LoginUserService,
    @Inject(REGISTER_USER_SERVICE)
    private readonly registerUserService: RegisterUserService,
  ) {}
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.registerUserService.createUser(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUserService.login(loginDto);
  }
}
