import {
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import RepositoryException from 'src/core/exceptions/repository.exception';
import { formatarDataParaISO8601 } from 'src/core/utils/formated_date_iso';
import { CreateUserUseCase } from '../domain/usecase/create_user_use_case';
import UpdateUserUseCase from '../domain/usecase/update_user_use_case';
import { UserEntity, UserProps } from '../domain/user_entity';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/updated_user.dto';
import { CREATE_USER_USE_CASE, UPDATE_USER_USE_CASE } from '../symbols';

@Controller('/api/user')
export default class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserService: CreateUserUseCase,
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserService: UpdateUserUseCase,
  ) {}
  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userProps: UserProps = {
        ...createUserDto,
        createdAt: formatarDataParaISO8601(new Date()),
        updatedAt: formatarDataParaISO8601(new Date()),
        role: createUserDto.role,
      };
      const userEntity = new UserEntity(userProps);
      return await this.createUserService.execute(userEntity);
    } catch (error) {
      if (error instanceof RepositoryException) {
        throw new HttpException(error.message, error.statusCode);
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.execute(id, updatedUserDto);
  }
}
