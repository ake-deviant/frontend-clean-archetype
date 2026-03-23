import {
  ConsoleLogger,
  GetUserPresenter,
  GetUserUseCase,
  InMemoryUserRepository,
} from '@frontend-archetype/core';

const userRepository = new InMemoryUserRepository();
const logger = new ConsoleLogger();

export const getUserUseCase = new GetUserUseCase(userRepository, logger);
export const getUserPresenter = new GetUserPresenter();
