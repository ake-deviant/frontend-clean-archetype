import { Component, inject, OnInit, signal, output } from '@angular/core';
import { AuthViewModel, UserViewModel } from '@frontend-archetype/core';
import {
  LOGIN_USE_CASE,
  LOGIN_PRESENTER,
  GET_ALL_USERS_USE_CASE,
  GET_ALL_USERS_PRESENTER,
} from '../di/app.providers';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit {
  private readonly loginUseCase = inject(LOGIN_USE_CASE);
  private readonly loginPresenter = inject(LOGIN_PRESENTER);
  private readonly getAllUsersUseCase = inject(GET_ALL_USERS_USE_CASE);
  private readonly getAllUsersPresenter = inject(GET_ALL_USERS_PRESENTER);

  readonly loggedIn = output<AuthViewModel>();
  readonly closed = output<void>();

  readonly users = signal<UserViewModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const result = await this.getAllUsersUseCase.execute();
    if (result.isOk) {
      this.users.set(this.getAllUsersPresenter.present(result.value));
    }
  }

  async selectUser(userId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    const result = await this.loginUseCase.execute({ userId });

    if (result.isErr) {
      this.error.set(result.error.message);
      this.isLoading.set(false);
      return;
    }

    this.loggedIn.emit(this.loginPresenter.present(result.value));
    this.isLoading.set(false);
  }

  close(): void {
    this.closed.emit();
  }
}
