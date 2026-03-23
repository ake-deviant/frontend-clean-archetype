import { GetUserUseCase } from '../../../../application/use-cases/get-user/get-user.use-case';
import { IUserRepository } from '../../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { User } from '../../../../domain/entities/user.entity';

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
    it('should return a UserResponse when user is found', async () => {
      mockRepository.findById.mockResolvedValue(mockUser);

      const result = await useCase.execute({ userId: '1' });

      expect(result).toEqual({ id: '1', name: 'Alice Dupont', email: 'alice@example.com' });
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(mockLogger.log).toHaveBeenCalledTimes(2);
    });

    it('should return null when user is not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await useCase.execute({ userId: '999' });

      expect(result).toBeNull();
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
