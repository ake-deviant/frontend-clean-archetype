import { GetUserResponse } from '../../application/use-cases/get-user/get-user.dto';
import { UserViewModel } from './user.view-model';
import { UserMapper } from './user.mapper';

export class GetUserPresenter {
  present(response: GetUserResponse | null): UserViewModel | null {
    if (!response) return null;
    return UserMapper.toViewModel(response);
  }
}
