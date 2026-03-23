import { User } from '../../../domain/entities/user.entity';
import { GetUserResponse } from './get-user.dto';

export class GetUserMapper {
  static toResponse(user: User): GetUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
