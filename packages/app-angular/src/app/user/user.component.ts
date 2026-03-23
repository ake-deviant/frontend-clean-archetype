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
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.useCase.execute({ userId: '1' });
      this.user.set(this.presenter.present(response));
    } catch {
      this.error.set('Failed to load user.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
