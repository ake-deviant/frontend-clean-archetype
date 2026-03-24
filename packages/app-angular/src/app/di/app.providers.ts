import { InjectionToken, Provider } from '@angular/core';
import {
  AxiosHttpClient,
  ConsoleLogger,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
} from '@frontend-archetype/core';

export const GET_USER_USE_CASE = new InjectionToken<GetUserUseCase>('GetUserUseCase');
export const GET_USER_PRESENTER = new InjectionToken<GetUserPresenter>('GetUserPresenter');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: GET_USER_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient('http://localhost:3001');
      const repository = new HttpUserRepository(http);
      const logger = new ConsoleLogger();
      return new GetUserUseCase(repository, logger);
    },
  },
  {
    provide: GET_USER_PRESENTER,
    useFactory: () => new GetUserPresenter(),
  },
];
