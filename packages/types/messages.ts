export const messages = {
  wrong_user_or_password: "Incorrect password or user does not exist.",
  unknown_error: "Unexpected error has occured.",
  user_does_not_exist: "User does not exist.",
  empty_password_not_allowed: "Empty passwords are not allowed.",
  server_error: "Unexpected error has occured.",
  unauthorized_request: "Request is not authorized.",
  email_already_exists: "Email already exists",
} as const;

export type MessageType = keyof typeof messages;
