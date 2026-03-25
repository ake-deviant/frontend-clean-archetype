import { IAuthService } from '../../ports/auth.service.port';
import { ILogger } from '../../ports/logger.port';
import { Result, ok, err } from '../../../domain/shared/result';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { LoginQuery, LoginResponse } from './login.dto';
import { LoginMapper } from './login.mapper';

export class LoginUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly logger: ILogger,
  ) {}

  async execute(query: LoginQuery): Promise<Result<LoginResponse, UserNotFoundError>> {
    this.logger.log(`[LoginUseCase] Logging in user: ${query.userId}`);

    const user = await this.authService.login(query.userId);

    if (!user) {
      this.logger.warn(`[LoginUseCase] User not found: ${query.userId}`);
      return err(new UserNotFoundError(query.userId));
    }

    this.logger.log(`[LoginUseCase] User logged in: ${user.name}`);
    return ok(LoginMapper.toResponse(user));
  }
}
