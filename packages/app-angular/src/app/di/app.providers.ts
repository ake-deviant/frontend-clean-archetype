import { InjectionToken, Provider } from '@angular/core';
import {
  AxiosHttpClient,
  ConsoleLogger,
  GetAllUsersPresenter,
  GetAllUsersUseCase,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
  HttpArticleRepository,
  GetArticleUseCase,
  GetAllArticlesUseCase,
  GetAllArticlesPresenter,
  AddToCartUseCase,
  AddToCartPresenter,
  InMemoryUserRepository,
  MockAuthService,
  LoginUseCase,
  LoginPresenter,
} from '@frontend-archetype/core';
import { environment } from '../../environments/environment';

export const GET_USER_USE_CASE = new InjectionToken<GetUserUseCase>('GetUserUseCase');
export const GET_USER_PRESENTER = new InjectionToken<GetUserPresenter>('GetUserPresenter');
export const GET_ALL_USERS_USE_CASE = new InjectionToken<GetAllUsersUseCase>('GetAllUsersUseCase');
export const GET_ALL_USERS_PRESENTER = new InjectionToken<GetAllUsersPresenter>(
  'GetAllUsersPresenter',
);
export const GET_ARTICLE_USE_CASE = new InjectionToken<GetArticleUseCase>('GetArticleUseCase');
export const GET_ALL_ARTICLES_USE_CASE = new InjectionToken<GetAllArticlesUseCase>(
  'GetAllArticlesUseCase',
);
export const GET_ALL_ARTICLES_PRESENTER = new InjectionToken<GetAllArticlesPresenter>(
  'GetAllArticlesPresenter',
);
export const ADD_TO_CART_USE_CASE = new InjectionToken<AddToCartUseCase>('AddToCartUseCase');
export const ADD_TO_CART_PRESENTER = new InjectionToken<AddToCartPresenter>('AddToCartPresenter');
export const LOGIN_USE_CASE = new InjectionToken<LoginUseCase>('LoginUseCase');
export const LOGIN_PRESENTER = new InjectionToken<LoginPresenter>('LoginPresenter');

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
  {
    provide: GET_ARTICLE_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient(environment.apiUrl);
      const repository = new HttpArticleRepository(http);
      const logger = new ConsoleLogger();
      return new GetArticleUseCase(repository, logger);
    },
  },
  {
    provide: GET_ALL_ARTICLES_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient(environment.apiUrl);
      const repository = new HttpArticleRepository(http);
      const logger = new ConsoleLogger();
      return new GetAllArticlesUseCase(repository, logger);
    },
  },
  {
    provide: GET_ALL_ARTICLES_PRESENTER,
    useFactory: () => new GetAllArticlesPresenter(),
  },
  {
    provide: ADD_TO_CART_USE_CASE,
    useFactory: () => {
      const http = new AxiosHttpClient(environment.apiUrl);
      const repository = new HttpArticleRepository(http);
      const logger = new ConsoleLogger();
      return new AddToCartUseCase(repository, logger);
    },
  },
  {
    provide: ADD_TO_CART_PRESENTER,
    useFactory: () => new AddToCartPresenter(),
  },
  {
    provide: LOGIN_USE_CASE,
    useFactory: () => {
      const repository = new InMemoryUserRepository();
      const authService = new MockAuthService(repository);
      const logger = new ConsoleLogger();
      return new LoginUseCase(authService, logger);
    },
  },
  {
    provide: LOGIN_PRESENTER,
    useFactory: () => new LoginPresenter(),
  },
];
