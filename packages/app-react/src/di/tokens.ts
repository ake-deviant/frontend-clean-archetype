import type {
  IHttpClient,
  ILogger,
  IUserRepository,
  IArticleRepository,
  IAuthService,
  GetUserUseCase,
  GetUserPresenter,
  GetAllUsersUseCase,
  GetAllUsersPresenter,
  GetAllArticlesUseCase,
  GetAllArticlesPresenter,
  AddToCartUseCase,
  AddToCartPresenter,
  LoginUseCase,
  LoginPresenter,
} from '@frontend-archetype/core';

export type AppRegistry = {
  httpClient: IHttpClient;
  logger: ILogger;
  userRepository: IUserRepository;
  articleRepository: IArticleRepository;
  authService: IAuthService;
  getUserUseCase: GetUserUseCase;
  getUserPresenter: GetUserPresenter;
  getAllUsersUseCase: GetAllUsersUseCase;
  getAllUsersPresenter: GetAllUsersPresenter;
  getAllArticlesUseCase: GetAllArticlesUseCase;
  getAllArticlesPresenter: GetAllArticlesPresenter;
  addToCartUseCase: AddToCartUseCase;
  addToCartPresenter: AddToCartPresenter;
  loginUseCase: LoginUseCase;
  loginPresenter: LoginPresenter;
};

export const DI_TOKENS = {
  HTTP_CLIENT: 'httpClient',
  LOGGER: 'logger',
  USER_REPOSITORY: 'userRepository',
  ARTICLE_REPOSITORY: 'articleRepository',
  AUTH_SERVICE: 'authService',
  GET_USER_USE_CASE: 'getUserUseCase',
  GET_USER_PRESENTER: 'getUserPresenter',
  GET_ALL_USERS_USE_CASE: 'getAllUsersUseCase',
  GET_ALL_USERS_PRESENTER: 'getAllUsersPresenter',
  GET_ALL_ARTICLES_USE_CASE: 'getAllArticlesUseCase',
  GET_ALL_ARTICLES_PRESENTER: 'getAllArticlesPresenter',
  ADD_TO_CART_USE_CASE: 'addToCartUseCase',
  ADD_TO_CART_PRESENTER: 'addToCartPresenter',
  LOGIN_USE_CASE: 'loginUseCase',
  LOGIN_PRESENTER: 'loginPresenter',
} as const satisfies Record<string, keyof AppRegistry>;
