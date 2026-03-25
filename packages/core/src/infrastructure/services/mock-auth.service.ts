import { User } from '../../domain/entities/user.entity';
import { IAuthService } from '../../application/ports/auth.service.port';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class MockAuthService implements IAuthService {
  private currentUser: User | null = null;

  constructor(private readonly userRepository: IUserRepository) {}

  async login(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    this.currentUser = user;
    return user;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
