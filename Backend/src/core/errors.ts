export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('User already exists with this email');
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsError';
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Unauthorized access');
    this.name = 'UnauthorizedError';
  }
}
