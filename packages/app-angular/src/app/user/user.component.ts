import { Component, inject, OnInit, signal } from '@angular/core';
import { UserViewModel } from '@frontend-archetype/core';
import { GET_USER_PRESENTER, GET_USER_USE_CASE } from '../di/app.providers';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private readonly useCase = inject(GET_USER_USE_CASE);
  private readonly presenter = inject(GET_USER_PRESENTER);

  readonly user = signal<UserViewModel | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await this.useCase.execute({ userId: '1' });

      if (result.isErr) {
        this.error.set(result.error.message);
        return;
      }

      this.user.set(this.presenter.present(result.value));
    } catch {
      this.error.set('An unexpected error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
