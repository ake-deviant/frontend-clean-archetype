import { InjectionToken, Provider } from '@angular/core';
import {
  AxiosHttpClient,
  ConsoleLogger,
  GetAllUsersPresenter,
  GetAllUsersUseCase,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
} from '@frontend-archetype/core';
import { environment } from '../../environments/environment';

export const GET_USER_USE_CASE = new InjectionToken<GetUserUseCase>('GetUserUseCase');
export const GET_USER_PRESENTER = new InjectionToken<GetUserPresenter>('GetUserPresenter');
export const GET_ALL_USERS_USE_CASE = new InjectionToken<GetAllUsersUseCase>('GetAllUsersUseCase');
export const GET_ALL_USERS_PRESENTER = new InjectionToken<GetAllUsersPresenter>(
  'GetAllUsersPresenter',
);

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: GET_USER_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient(environment.apiUrl);
      const repository = new HttpUserRepository(http);
      const logger = new ConsoleLogger();
      return new GetUserUseCase(repository, logger);
    },
  },
  {
    provide: GET_USER_PRESENTER,
    useFactory: () => new GetUserPresenter(),
  },
  {
    provide: GET_ALL_USERS_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient(environment.apiUrl);
      const repository = new HttpUserRepository(http);
      const logger = new ConsoleLogger();
      return new GetAllUsersUseCase(repository, logger);
    },
  },
  {
    provide: GET_ALL_USERS_PRESENTER,
    useFactory: () => new GetAllUsersPresenter(),
  },
];
