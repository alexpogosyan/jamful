import { messages, MessageType } from "@jamful/types/messages";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getUnknownErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export const getErrorMessage = (err: any) => {
  const code: MessageType = err.response?.data?.errorCode;

  if (code in messages) {
    return messages[code];
  } else {
    console.error("Unknown error: ", getUnknownErrorMessage(err));
    return messages.unknown_error;
  }
};
