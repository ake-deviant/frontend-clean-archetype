import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { Result, ok } from '../../../domain/shared/result';
import { GetAllUsersResponse } from './get-all-users.dto';
import { GetAllUsersMapper } from './get-all-users.mapper';

export class GetAllUsersUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<Result<GetAllUsersResponse>> {
    this.logger.log('[GetAllUsersUseCase] Fetching all users');

    const users = await this.userRepository.findAll();

    this.logger.log(`[GetAllUsersUseCase] Found ${users.length} users`);

    return ok(GetAllUsersMapper.toResponse(users));
  }
}
