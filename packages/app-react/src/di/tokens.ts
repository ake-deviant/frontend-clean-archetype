import type {
  IHttpClient,
  ILogger,
  IUserRepository,
  GetUserUseCase,
  GetUserPresenter,
  GetAllUsersUseCase,
  GetAllUsersPresenter,
} from '@frontend-archetype/core';

export type AppRegistry = {
  httpClient: IHttpClient;
  logger: ILogger;
  userRepository: IUserRepository;
  getUserUseCase: GetUserUseCase;
  getUserPresenter: GetUserPresenter;
  getAllUsersUseCase: GetAllUsersUseCase;
  getAllUsersPresenter: GetAllUsersPresenter;
};

export const DI_TOKENS = {
  HTTP_CLIENT: 'httpClient',
  LOGGER: 'logger',
  USER_REPOSITORY: 'userRepository',
  GET_USER_USE_CASE: 'getUserUseCase',
  GET_USER_PRESENTER: 'getUserPresenter',
  GET_ALL_USERS_USE_CASE: 'getAllUsersUseCase',
  GET_ALL_USERS_PRESENTER: 'getAllUsersPresenter',
} as const satisfies Record<string, keyof AppRegistry>;
