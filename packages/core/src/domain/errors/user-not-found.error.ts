import { DomainError } from './domain.error';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User with id "${userId}" not found`);
  }
}
