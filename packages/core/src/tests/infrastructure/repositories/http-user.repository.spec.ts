import { HttpUserRepository } from '../../../infrastructure/repositories/http-user.repository';
import { IHttpClient } from '../../../application/ports/http-client.port';
import { User } from '../../../domain/entities/user.entity';

const mockUser: User = { id: '1', name: 'Alice Dupont', email: 'alice@example.com' };

const mockHttpClient: jest.Mocked<IHttpClient> = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('HttpUserRepository', () => {
  let repository: HttpUserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new HttpUserRepository(mockHttpClient);
  });

  describe('findById', () => {
    it('should return a user when HTTP response is successful', async () => {
      mockHttpClient.get.mockResolvedValue(mockUser);

      const result = await repository.findById('1');

      expect(result).toEqual(mockUser);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/1');
    });

    it('should return null when HTTP response is 404', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('HTTP 404: Not Found'));

      const result = await repository.findById('999');

      expect(result).toBeNull();
    });

    it('should return null on network error', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Network Error'));

      const result = await repository.findById('1');

      expect(result).toBeNull();
    });

    it('should return null on HTTP 500', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('HTTP 500: Internal Server Error'));

      const result = await repository.findById('1');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return a list of users when HTTP response is successful', async () => {
      const users: User[] = [
        mockUser,
        { id: '2', name: 'Bob Martin', email: 'bob@example.com' },
      ];
      mockHttpClient.get.mockResolvedValue(users);

      const result = await repository.findAll();

      expect(result).toEqual(users);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/users');
    });

    it('should return an empty array on network error', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Network Error'));

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });

    it('should return an empty array on HTTP 500', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('HTTP 500: Internal Server Error'));

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });
});
