import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent],
  template: `
    <h1>Frontend Archetype — Angular</h1>
    <app-user />
  `,
})
export class AppComponent {}
