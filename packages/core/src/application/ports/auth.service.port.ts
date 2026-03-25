import { User } from '../../domain/entities/user.entity';

export interface IAuthService {
  login(userId: string): Promise<User | null>;
  logout(): void;
  getCurrentUser(): User | null;
}
