import { GetAllUsersUseCase } from '../../../../application/use-cases/get-all-users/get-all-users.use-case';
import { IUserRepository } from '../../../../domain/repositories/user.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { User } from '../../../../domain/entities/user.entity';

const mockUsers: User[] = [
  { id: '1', name: 'Alice Dupont', email: 'alice@example.com' },
  { id: '2', name: 'Bob Martin', email: 'bob@example.com' },
];

const mockRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
};

const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetAllUsersUseCase(mockRepository, mockLogger);
  });

  describe('execute', () => {
    it('should return Ok with all users', async () => {
      mockRepository.findAll.mockResolvedValue(mockUsers);

      const result = await useCase.execute();

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0]).toEqual({
          id: '1',
          name: 'Alice Dupont',
          email: 'alice@example.com',
        });
        expect(result.value[1]).toEqual({ id: '2', name: 'Bob Martin', email: 'bob@example.com' });
      }
    });

    it('should return Ok with an empty array when no users exist', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toHaveLength(0);
      }
    });

    it('should log the number of users found', async () => {
      mockRepository.findAll.mockResolvedValue(mockUsers);

      await useCase.execute();

      expect(mockLogger.log).toHaveBeenCalledWith('[GetAllUsersUseCase] Found 2 users');
    });
  });
});
