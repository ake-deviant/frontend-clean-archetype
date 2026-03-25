// Domain
export type { User } from './domain/entities/user.entity';
export type { IUserRepository } from './domain/repositories/user.repository.interface';
export type { Article } from './domain/entities/article.entity';
export type { Cart, CartItem } from './domain/entities/cart.entity';
export type { IArticleRepository } from './domain/repositories/article.repository.interface';
export { DomainError } from './domain/errors/domain.error';
export { UserNotFoundError } from './domain/errors/user-not-found.error';
export { ArticleNotFoundError } from './domain/errors/article-not-found.error';
export type { Result } from './domain/shared/result';
export { ok, err, Ok, Err } from './domain/shared/result';

// Application — Ports
export type { ILogger } from './application/ports/logger.port';
export type { IStorageService } from './application/ports/storage.port';
export type { ICookieService, CookieOptions } from './application/ports/cookie.port';
export type { IHttpClient, HttpOptions } from './application/ports/http-client.port';
export type { IAuthService } from './application/ports/auth.service.port';

// Application — Use Cases
export type { GetUserQuery, GetUserResponse } from './application/use-cases/get-user/get-user.dto';
export { GetUserUseCase } from './application/use-cases/get-user/get-user.use-case';
export { GetUserMapper } from './application/use-cases/get-user/get-user.mapper';
export type { GetAllUsersResponse } from './application/use-cases/get-all-users/get-all-users.dto';
export { GetAllUsersUseCase } from './application/use-cases/get-all-users/get-all-users.use-case';
export { GetAllUsersMapper } from './application/use-cases/get-all-users/get-all-users.mapper';
export type {
  GetArticleQuery,
  GetArticleResponse,
} from './application/use-cases/get-article/get-article.dto';
export { GetArticleUseCase } from './application/use-cases/get-article/get-article.use-case';
export { GetArticleMapper } from './application/use-cases/get-article/get-article.mapper';
export type {
  GetAllArticlesResponse,
  ArticleListItem,
} from './application/use-cases/get-all-articles/get-all-articles.dto';
export { GetAllArticlesUseCase } from './application/use-cases/get-all-articles/get-all-articles.use-case';
export { GetAllArticlesMapper } from './application/use-cases/get-all-articles/get-all-articles.mapper';
export type {
  AddToCartQuery,
  CartItemQuery,
  CartItemResponse,
  CartResponse,
} from './application/use-cases/add-to-cart/add-to-cart.dto';
export { AddToCartUseCase } from './application/use-cases/add-to-cart/add-to-cart.use-case';
export { AddToCartMapper } from './application/use-cases/add-to-cart/add-to-cart.mapper';
export type { LoginQuery, LoginResponse } from './application/use-cases/login/login.dto';
export { LoginUseCase } from './application/use-cases/login/login.use-case';
export { LoginMapper } from './application/use-cases/login/login.mapper';

// Infrastructure
export { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user.repository';
export { HttpUserRepository } from './infrastructure/repositories/http-user.repository';
export { InMemoryArticleRepository } from './infrastructure/repositories/in-memory-article.repository';
export { HttpArticleRepository } from './infrastructure/repositories/http-article.repository';
export { MockAuthService } from './infrastructure/services/mock-auth.service';
export { ConsoleLogger } from './infrastructure/adapters/console-logger.adapter';
export { LocalStorageAdapter } from './infrastructure/adapters/local-storage.adapter';
export { CookieAdapter } from './infrastructure/adapters/cookie.adapter';
export { FetchHttpClient } from './infrastructure/adapters/fetch-http-client.adapter';
export { AxiosHttpClient } from './infrastructure/adapters/axios-http-client.adapter';

// Presentation
export type { UserViewModel } from './presentation/user/user.view-model';
export { GetUserPresenter } from './presentation/user/get-user.presenter';
export { GetAllUsersPresenter } from './presentation/user/get-all-users.presenter';
export { UserMapper } from './presentation/user/user.mapper';
export type { ArticleViewModel } from './presentation/article/article.view-model';
export type { CartViewModel, CartItemViewModel } from './presentation/article/cart.view-model';
export { ArticleMapper, CartMapper } from './presentation/article/article.mapper';
export { GetAllArticlesPresenter } from './presentation/article/get-all-articles.presenter';
export { AddToCartPresenter } from './presentation/article/add-to-cart.presenter';
export type { AuthViewModel } from './presentation/auth/auth.view-model';
export { LoginPresenter } from './presentation/auth/login.presenter';
