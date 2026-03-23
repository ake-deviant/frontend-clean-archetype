import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { GetUserQuery, GetUserResponse } from './get-user.dto';

export class GetUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(query: GetUserQuery): Promise<GetUserResponse | null> {
    this.logger.log(`[GetUserUseCase] Fetching user with id: ${query.userId}`);

    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      this.logger.warn(`[GetUserUseCase] User not found: ${query.userId}`);
      return null;
    }

    this.logger.log(`[GetUserUseCase] User found: ${user.name}`);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
