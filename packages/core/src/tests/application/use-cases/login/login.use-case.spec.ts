import { LoginUseCase } from '../../../../application/use-cases/login/login.use-case';
import { IAuthService } from '../../../../application/ports/auth.service.port';
import { ILogger } from '../../../../application/ports/logger.port';
import { User } from '../../../../domain/entities/user.entity';
import { UserNotFoundError } from '../../../../domain/errors/user-not-found.error';

const mockUser: User = { id: '1', name: 'Alice Dupont', email: 'alice@example.com' };

const mockAuthService: jest.Mocked<IAuthService> = {
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
};

const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new LoginUseCase(mockAuthService, mockLogger);
  });

  describe('execute', () => {
    it('should return Ok with LoginResponse when user exists', async () => {
      mockAuthService.login.mockResolvedValue(mockUser);

      const result = await useCase.execute({ userId: '1' });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toEqual({
          id: '1',
          name: 'Alice Dupont',
          email: 'alice@example.com',
        });
      }
      expect(mockAuthService.login).toHaveBeenCalledWith('1');
    });

    it('should return Err with UserNotFoundError when user does not exist', async () => {
      mockAuthService.login.mockResolvedValue(null);

      const result = await useCase.execute({ userId: '999' });

      expect(result.isErr).toBe(true);
      if (result.isErr) {
        expect(result.error).toBeInstanceOf(UserNotFoundError);
        expect(result.error.message).toBe('User with id "999" not found');
      }
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    });

    it('should log the userId on each call', async () => {
      mockAuthService.login.mockResolvedValue(mockUser);

      await useCase.execute({ userId: '1' });

      expect(mockLogger.log).toHaveBeenCalledWith('[LoginUseCase] Logging in user: 1');
    });
  });
});
