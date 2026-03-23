import { GetUserResponse } from '../../application/use-cases/get-user/get-user.dto';
import { UserViewModel } from './user.view-model';

export class GetUserPresenter {
  present(response: GetUserResponse | null): UserViewModel | null {
    if (!response) return null;

    return {
      id: response.id,
      fullName: response.name,
      email: response.email,
      displayLabel: `${response.name} <${response.email}>`,
    };
  }
}
