import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUseCase } from '../domain/usecase/create_user_use_case';
import UpdateUserUseCase from '../domain/usecase/update_user_use_case';
import { UserEntity, UserProps } from '../domain/user_entity';
import CreateUserDto from '../dto/create_user.dto';
import { CreateUserAdminDto } from '../dto/create_user_admin.dto';
import { UpdateUserAdminDto } from '../dto/updated_user_admin.dto';
import { CREATE_USER_USE_CASE, UPDATE_USER_USE_CASE } from '../symbols';

@Controller('/api/user')
export default class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserService: CreateUserUseCase,
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserService: UpdateUserUseCase,
  ) {}
  @Post('/admin')
  @HttpCode(HttpStatus.CREATED)
  async createUserAdmin(@Body() createUserAdminDto: CreateUserAdminDto) {
    try {
      const userProps: UserProps = {
        ...createUserAdminDto,
        role: createUserAdminDto.role,
      };
      const userAdminEntity = new UserEntity(userProps);
      return await this.createUserService.execute(userAdminEntity);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUser: CreateUserDto) {
    try {
      const userProps: UserProps = {
        ...createUser,
        role: createUser.role,
      };
      const userEntity = new UserEntity(userProps);
      return await this.createUserService.execute(userEntity);
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUserDto: UpdateUserAdminDto,
  ) {
    return this.updateUserService.execute(id, updatedUserDto);
  }
}
