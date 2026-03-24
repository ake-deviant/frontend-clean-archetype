import {
  AxiosHttpClient,
  ConsoleLogger,
  GetAllUsersPresenter,
  GetAllUsersUseCase,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
} from '@frontend-archetype/core';

const http = new AxiosHttpClient(import.meta.env.VITE_API_URL as string);
const userRepository = new HttpUserRepository(http);
const logger = new ConsoleLogger();

export const getUserUseCase = new GetUserUseCase(userRepository, logger);
export const getUserPresenter = new GetUserPresenter();

export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository, logger);
export const getAllUsersPresenter = new GetAllUsersPresenter();
