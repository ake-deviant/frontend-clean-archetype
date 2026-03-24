import {
  AxiosHttpClient,
  ConsoleLogger,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
} from '@frontend-archetype/core';

const http = new AxiosHttpClient('http://localhost:3001');
const userRepository = new HttpUserRepository(http);
const logger = new ConsoleLogger();

export const getUserUseCase = new GetUserUseCase(userRepository, logger);
export const getUserPresenter = new GetUserPresenter();
