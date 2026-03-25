import { User } from '../../../domain/entities/user.entity';
import { LoginResponse } from './login.dto';

export class LoginMapper {
  static toResponse(user: User): LoginResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
