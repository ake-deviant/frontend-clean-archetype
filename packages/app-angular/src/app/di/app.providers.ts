import { InjectionToken, Provider } from '@angular/core';
import {
  ConsoleLogger,
  GetUserPresenter,
  GetUserUseCase,
  InMemoryUserRepository,
} from '@frontend-archetype/core';

export const GET_USER_USE_CASE = new InjectionToken<GetUserUseCase>('GetUserUseCase');
export const GET_USER_PRESENTER = new InjectionToken<GetUserPresenter>('GetUserPresenter');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: GET_USER_USE_CASE,
    useFactory: () => {
      const repository = new InMemoryUserRepository();
      const logger = new ConsoleLogger();
      return new GetUserUseCase(repository, logger);
    },
  },
  {
    provide: GET_USER_PRESENTER,
    useFactory: () => new GetUserPresenter(),
  },
];
