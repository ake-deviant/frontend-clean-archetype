import { createContainer } from '@evyweb/ioctopus';
import {
  AxiosHttpClient,
  ConsoleLogger,
  GetAllUsersPresenter,
  GetAllUsersUseCase,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
  HttpArticleRepository,
  InMemoryUserRepository,
  GetAllArticlesUseCase,
  GetAllArticlesPresenter,
  AddToCartUseCase,
  AddToCartPresenter,
  MockAuthService,
  LoginUseCase,
  LoginPresenter,
} from '@frontend-archetype/core';
import { type AppRegistry, DI_TOKENS } from './tokens';

const container = createContainer<AppRegistry>();

container
  .bind(DI_TOKENS.HTTP_CLIENT)
  .toFactory(() => new AxiosHttpClient(import.meta.env.VITE_API_URL as string));

container.bind(DI_TOKENS.LOGGER).toClass(ConsoleLogger, []);

container.bind(DI_TOKENS.USER_REPOSITORY).toClass(HttpUserRepository, [DI_TOKENS.HTTP_CLIENT]);

container
  .bind(DI_TOKENS.ARTICLE_REPOSITORY)
  .toClass(HttpArticleRepository, [DI_TOKENS.HTTP_CLIENT]);

container
  .bind(DI_TOKENS.AUTH_SERVICE)
  .toFactory(() => new MockAuthService(new InMemoryUserRepository()));

container
  .bind(DI_TOKENS.GET_USER_USE_CASE)
  .toClass(GetUserUseCase, [DI_TOKENS.USER_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.GET_USER_PRESENTER).toClass(GetUserPresenter, []);

container
  .bind(DI_TOKENS.GET_ALL_USERS_USE_CASE)
  .toClass(GetAllUsersUseCase, [DI_TOKENS.USER_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.GET_ALL_USERS_PRESENTER).toClass(GetAllUsersPresenter, []);

container
  .bind(DI_TOKENS.GET_ALL_ARTICLES_USE_CASE)
  .toClass(GetAllArticlesUseCase, [DI_TOKENS.ARTICLE_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.GET_ALL_ARTICLES_PRESENTER).toClass(GetAllArticlesPresenter, []);

container
  .bind(DI_TOKENS.ADD_TO_CART_USE_CASE)
  .toClass(AddToCartUseCase, [DI_TOKENS.ARTICLE_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.ADD_TO_CART_PRESENTER).toClass(AddToCartPresenter, []);

container
  .bind(DI_TOKENS.LOGIN_USE_CASE)
  .toClass(LoginUseCase, [DI_TOKENS.AUTH_SERVICE, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.LOGIN_PRESENTER).toClass(LoginPresenter, []);

export { container };
