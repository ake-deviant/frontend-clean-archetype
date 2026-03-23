import { GetUserUseCase } from '../../../../application/use-cases/get-user/get-user.use-case';
import { IUserRepository } from '../../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { User } from '../../../../domain/entities/user.entity';
import { UserNotFoundError } from '../../../../domain/errors/user-not-found.error';

const mockUser: User = { id: '1', name: 'Alice Dupont', email: 'alice@example.com' };

const mockRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
};

const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetUserUseCase(mockRepository, mockLogger);
  });

  describe('execute', () => {
    it('should return Ok with a UserResponse when user is found', async () => {
      mockRepository.findById.mockResolvedValue(mockUser);

      const result = await useCase.execute({ userId: '1' });

      expect(result.isOk).toBe(true);
      expect(result.isErr).toBe(false);
      if (result.isOk) {
        expect(result.value).toEqual({ id: '1', name: 'Alice Dupont', email: 'alice@example.com' });
      }
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockLogger.log).toHaveBeenCalledTimes(2);
    });

    it('should return Err with UserNotFoundError when user is not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await useCase.execute({ userId: '999' });

      expect(result.isErr).toBe(true);
      expect(result.isOk).toBe(false);
      if (result.isErr) {
        expect(result.error).toBeInstanceOf(UserNotFoundError);
        expect(result.error.message).toBe('User with id "999" not found');
      }
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    });

    it('should log the userId on each call', async () => {
      mockRepository.findById.mockResolvedValue(mockUser);

      await useCase.execute({ userId: '1' });

      expect(mockLogger.log).toHaveBeenCalledWith(
        '[GetUserUseCase] Fetching user with id: 1',
      );
    });
  });
});
