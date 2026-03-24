import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

const SEED_USERS: User[] = [
  { id: '1', name: 'Alice Dupont', email: 'alice@example.com' },
  { id: '2', name: 'Bob Martin', email: 'bob@example.com' },
];

export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[];

  constructor(initialData: User[] = SEED_USERS) {
    this.users = [...initialData];
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }
}
