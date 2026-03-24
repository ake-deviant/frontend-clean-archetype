import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IHttpClient } from '../../application/ports/http-client.port';

export class HttpUserRepository implements IUserRepository {
  constructor(private readonly http: IHttpClient) {}

  async findById(id: string): Promise<User | null> {
    try {
      return await this.http.get<User>(`/users/${id}`);
    } catch {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.http.get<User[]>('/users');
    } catch {
      return [];
    }
  }
}
