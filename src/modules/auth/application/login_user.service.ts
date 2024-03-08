import ServiceException from 'src/core/exceptions/service.exception';
import TokenModel from 'src/core/model/token_model';
import EncryptionService from 'src/core/services/encryption.service';
import JsonWebTokenService from 'src/core/services/json_web_token.service';
import UserRepositoryInterface from 'src/modules/user/adapters/user_repository';
import LoginDto from '../dto/login_dto';

export default class LoginUserService {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JsonWebTokenService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new ServiceException('E-mail or Passowrd not Found');
    }
    const passwordMatch = await this.encryptionService.compare(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new ServiceException('E-mail or Passowrd not Found');
    }
    const accesToken = await this.jwtService.sign({
      sub: user.id,
      role: user.role,
      type: 'access',
    });
    const refreshToken = await this.jwtService.sign({
      sub: user.id,
      role: user.role,
      type: 'refresh',
    });
    return new TokenModel(accesToken, refreshToken).toJSON();
  }
}
