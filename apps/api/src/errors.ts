import { MessageType } from "@jamful/types/messages";

export class DatabaseError extends Error {
  constructor(message?: MessageType) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ValidationError extends Error {
  constructor(message?: MessageType) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message?: MessageType) {
    super(message);
    this.name = "AuthorizationError";
  }
}
