import { User } from '../../../domain/entities/user.entity';
import { GetUserMapper } from '../get-user/get-user.mapper';
import { GetAllUsersResponse } from './get-all-users.dto';

export class GetAllUsersMapper {
  static toResponse(users: User[]): GetAllUsersResponse {
    return users.map(GetUserMapper.toResponse);
  }
}
