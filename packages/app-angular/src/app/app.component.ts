import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthComponent, ArticleComponent],
  template: `
    <header>
      <h1>Frontend Archetype — Angular</h1>
      <app-auth />
    </header>
    <main>
      <app-article />
    </main>
  `,
})
export class AppComponent {}
