import { GetUserResponse } from '../../application/use-cases/get-user/get-user.dto';
import { UserViewModel } from './user.view-model';

export class UserMapper {
  static toViewModel(response: GetUserResponse): UserViewModel {
    return {
      id: response.id,
      fullName: response.name,
      email: response.email,
      displayLabel: `${response.name} <${response.email}>`,
    };
  }
}
