import { LoginResponse } from '../../application/use-cases/login/login.dto';
import { AuthViewModel } from './auth.view-model';

export class LoginPresenter {
  present(response: LoginResponse): AuthViewModel {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      displayLabel: `${response.name} <${response.email}>`,
    };
  }
}
