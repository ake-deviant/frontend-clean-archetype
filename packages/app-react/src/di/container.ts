import { createContainer } from '@evyweb/ioctopus';
import {
  AxiosHttpClient,
  ConsoleLogger,
  GetAllUsersPresenter,
  GetAllUsersUseCase,
  GetUserPresenter,
  GetUserUseCase,
  HttpUserRepository,
} from '@frontend-archetype/core';
import { type AppRegistry, DI_TOKENS } from './tokens';

const container = createContainer<AppRegistry>();

container
  .bind(DI_TOKENS.HTTP_CLIENT)
  .toFactory(() => new AxiosHttpClient(import.meta.env.VITE_API_URL as string));

container.bind(DI_TOKENS.LOGGER).toClass(ConsoleLogger, []);

container.bind(DI_TOKENS.USER_REPOSITORY).toClass(HttpUserRepository, [DI_TOKENS.HTTP_CLIENT]);

container
  .bind(DI_TOKENS.GET_USER_USE_CASE)
  .toClass(GetUserUseCase, [DI_TOKENS.USER_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.GET_USER_PRESENTER).toClass(GetUserPresenter, []);

container
  .bind(DI_TOKENS.GET_ALL_USERS_USE_CASE)
  .toClass(GetAllUsersUseCase, [DI_TOKENS.USER_REPOSITORY, DI_TOKENS.LOGGER]);

container.bind(DI_TOKENS.GET_ALL_USERS_PRESENTER).toClass(GetAllUsersPresenter, []);

export { container };
