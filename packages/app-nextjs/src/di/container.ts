import {
  ConsoleLogger,
  HttpArticleRepository,
  HttpUserRepository,
  InMemoryUserRepository,
  FetchHttpClient,
  GetAllArticlesUseCase,
  GetAllArticlesPresenter,
  AddToCartUseCase,
  AddToCartPresenter,
  GetAllUsersUseCase,
  GetAllUsersPresenter,
  LoginUseCase,
  LoginPresenter,
  MockAuthService,
} from '@frontend-archetype/core';

const apiUrl = process.env.API_URL ?? 'http://localhost:3001';

const logger = new ConsoleLogger();
const http = new FetchHttpClient(apiUrl);

const userRepository = new HttpUserRepository(http);
const articleRepository = new HttpArticleRepository(http);
const authService = new MockAuthService(new InMemoryUserRepository());

export const getAllArticlesUseCase = new GetAllArticlesUseCase(articleRepository, logger);
export const getAllArticlesPresenter = new GetAllArticlesPresenter();

export const addToCartUseCase = new AddToCartUseCase(articleRepository, logger);
export const addToCartPresenter = new AddToCartPresenter();

export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository, logger);
export const getAllUsersPresenter = new GetAllUsersPresenter();

export const loginUseCase = new LoginUseCase(authService, logger);
export const loginPresenter = new LoginPresenter();
