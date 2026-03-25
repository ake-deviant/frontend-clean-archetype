import { Component, signal } from '@angular/core';
import { AuthViewModel } from '@frontend-archetype/core';
import { LoginModalComponent } from './login-modal.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginModalComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  readonly currentUser = signal<AuthViewModel | null>(null);
  readonly showModal = signal(false);

  openModal(): void {
    this.showModal.set(true);
  }

  onLoggedIn(user: AuthViewModel): void {
    this.currentUser.set(user);
    this.showModal.set(false);
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
