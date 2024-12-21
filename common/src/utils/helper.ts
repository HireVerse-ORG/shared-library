import { ServiceError } from "@grpc/grpc-js";
import * as grpc from '@grpc/grpc-js';
import { ApplicationError, BadRequestError, ForbiddenError, InternalError, InvalidIdError, MissingFieldError, NotFoundError, UnauthorizedError } from "../app.errors";

export function mapGrpcErrorToHttpStatus(error: ServiceError): number {
    switch (error.code) {
      case 3: // INVALID_ARGUMENT
        return 400;
      case 5: // NOT_FOUND
        return 404;
      case 7: // PERMISSION_DENIED
      case 16: // UNAUTHENTICATED
        return 401;
      case 13: // INTERNAL
        return 500;
      default:
        return 500;
    }
}

export function mapErrorToGrpcStatus(error: ApplicationError): number {
    if (error instanceof BadRequestError || error instanceof MissingFieldError || error instanceof InvalidIdError) {
      return grpc.status.INVALID_ARGUMENT;
    }
    if (error instanceof UnauthorizedError) {
      return grpc.status.UNAUTHENTICATED;
    }
    if (error instanceof ForbiddenError) {
      return grpc.status.PERMISSION_DENIED;
    }
    if (error instanceof NotFoundError) {
      return grpc.status.NOT_FOUND;
    }
    if (error instanceof InternalError) {
      return grpc.status.INTERNAL;
    }
  
    return grpc.status.INTERNAL;
  }

