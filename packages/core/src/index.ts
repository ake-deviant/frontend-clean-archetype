// Domain
export type { User } from './domain/entities/user.entity';
export type { IUserRepository } from './domain/repositories/user.repository.interface';

// Application — Ports
export type { ILogger } from './application/ports/logger.port';
export type { IStorageService } from './application/ports/storage.port';
export type { ICookieService, CookieOptions } from './application/ports/cookie.port';
export type { IHttpClient, HttpOptions } from './application/ports/http-client.port';

// Application — Use Cases
export type { GetUserQuery, GetUserResponse } from './application/use-cases/get-user/get-user.dto';
export { GetUserUseCase } from './application/use-cases/get-user/get-user.use-case';
export { GetUserMapper } from './application/use-cases/get-user/get-user.mapper';

// Infrastructure
export { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user.repository';
export { ConsoleLogger } from './infrastructure/adapters/console-logger.adapter';
export { LocalStorageAdapter } from './infrastructure/adapters/local-storage.adapter';
export { CookieAdapter } from './infrastructure/adapters/cookie.adapter';
export { FetchHttpClient } from './infrastructure/adapters/fetch-http-client.adapter';
export { AxiosHttpClient } from './infrastructure/adapters/axios-http-client.adapter';

// Presentation
export type { UserViewModel } from './presentation/user/user.view-model';
export { GetUserPresenter } from './presentation/user/get-user.presenter';
export { UserMapper } from './presentation/user/user.mapper';
