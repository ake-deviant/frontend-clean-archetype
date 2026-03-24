import { Component, inject, OnInit, signal } from '@angular/core';
import { UserViewModel } from '@frontend-archetype/core';
import {
  GET_ALL_USERS_PRESENTER,
  GET_ALL_USERS_USE_CASE,
  GET_USER_PRESENTER,
  GET_USER_USE_CASE,
} from '../di/app.providers';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private readonly getUserUseCase = inject(GET_USER_USE_CASE);
  private readonly getUserPresenter = inject(GET_USER_PRESENTER);
  private readonly getAllUsersUseCase = inject(GET_ALL_USERS_USE_CASE);
  private readonly getAllUsersPresenter = inject(GET_ALL_USERS_PRESENTER);

  readonly user = signal<UserViewModel | null>(null);
  readonly users = signal<UserViewModel[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAll();
  }

  async loadAll(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const [userResult, allUsersResult] = await Promise.all([
        this.getUserUseCase.execute({ userId: '1' }),
        this.getAllUsersUseCase.execute(),
      ]);

      if (userResult.isErr) {
        this.error.set(userResult.error.message);
        return;
      }

      this.user.set(this.getUserPresenter.present(userResult.value));

      if (allUsersResult.isOk) {
        this.users.set(this.getAllUsersPresenter.present(allUsersResult.value));
      }
    } catch {
      this.error.set('An unexpected error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
