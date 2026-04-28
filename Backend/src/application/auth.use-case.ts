import { IUserRepository } from './interfaces';
import { IHashService, ITokenService } from './services';
import { LoginInput, RegisterInput } from './dtos';
import { UserAlreadyExistsError, InvalidCredentialsError } from '@/core/errors';

export class AuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async login(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new InvalidCredentialsError();

    const isValid = await this.hashService.compare(input.password, user.passwordHash);
    if (!isValid) throw new InvalidCredentialsError();

    const token = this.tokenService.generate({ id: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  }

  async register(input: RegisterInput) {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) throw new UserAlreadyExistsError();

    const passwordHash = await this.hashService.hash(input.password);
    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const token = this.tokenService.generate({ id: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    };
  }
}
