export class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}
