import { DomainError } from '../errors/domain.error';

export class Ok<T> {
  readonly isOk = true as const;
  readonly isErr = false as const;

  constructor(public readonly value: T) {}
}

export class Err<E extends DomainError> {
  readonly isOk = false as const;
  readonly isErr = true as const;

  constructor(public readonly error: E) {}
}

export type Result<T, E extends DomainError = DomainError> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => new Ok(value);
export const err = <E extends DomainError>(error: E): Err<E> => new Err(error);
