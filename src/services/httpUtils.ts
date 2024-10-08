import { ForbiddenError } from "@/errors/ForbiddenError";
import { HttpError } from "@/errors/HttpError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

export function validatePetition(petition: Response) {
  if (petition.status === 403)
    throw new ForbiddenError("You have been banned from the server");
  if (petition.status === 401)
    throw new UnauthorizedError("You cannot access this resource");
  if (!petition.ok) throw new HttpError(`status: ${petition.status}`);
}

export function handleErrors(error: unknown) {
  if (error instanceof ForbiddenError) {
    window.location.href = "/forbidden";
    throw error;
  } else if (error instanceof UnauthorizedError) {
    window.location.href = "/login";
    throw error;
  }
  throw error;
}
