import { GetAllUsersResponse } from '../../application/use-cases/get-all-users/get-all-users.dto';
import { UserViewModel } from './user.view-model';
import { UserMapper } from './user.mapper';

export class GetAllUsersPresenter {
  present(response: GetAllUsersResponse): UserViewModel[] {
    return response.map(UserMapper.toViewModel);
  }
}
