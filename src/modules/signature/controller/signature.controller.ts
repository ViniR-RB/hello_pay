import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/core/decorators/role.decorator';
import RepositoryException from 'src/core/exceptions/repository.exception';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/role.guard';
import { UserRole } from 'src/modules/user/domain/user_entity';
import CreateSignatureUseCase from '../domain/usecase/create_signature_use_case';
import CreateSignatureDto from '../dto/create_signature.dto';
import { CREATE_SIGNATURE_USE_CASE } from '../symbols';

@Controller('/api/signature')
@Roles(UserRole.Admin)
@UseGuards(AuthGuard, RolesGuard)
export default class SignatureController {
  constructor(
    @Inject(CREATE_SIGNATURE_USE_CASE)
    private readonly createSignatureService: CreateSignatureUseCase,
  ) {}
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSignatureDto: CreateSignatureDto) {
    try {
      return await this.createSignatureService.execute(createSignatureDto);
    } catch (error) {
      if (error instanceof RepositoryException) {
        throw new HttpException(error.message, error.statusCode);
      }
    }
  }
}
