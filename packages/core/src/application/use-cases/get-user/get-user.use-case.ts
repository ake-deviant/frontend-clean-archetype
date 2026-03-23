import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { Result, ok, err } from '../../../domain/shared/result';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { GetUserQuery, GetUserResponse } from './get-user.dto';
import { GetUserMapper } from './get-user.mapper';

export class GetUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(query: GetUserQuery): Promise<Result<GetUserResponse, UserNotFoundError>> {
    this.logger.log(`[GetUserUseCase] Fetching user with id: ${query.userId}`);

    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      this.logger.warn(`[GetUserUseCase] User not found: ${query.userId}`);
      return err(new UserNotFoundError(query.userId));
    }

    this.logger.log(`[GetUserUseCase] User found: ${user.name}`);

    return ok(GetUserMapper.toResponse(user));
  }
}
