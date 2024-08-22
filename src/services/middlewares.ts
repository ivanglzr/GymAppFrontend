import { ForbiddenError } from "@/errors/ForbiddenError";
import { HttpError } from "@/errors/HttpError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

export function validatePetition(petition: Response) {
  if (petition.status === 403)
    throw new ForbiddenError("You have been banned from the server");
  if (petition.status === 401)
    throw new UnauthorizedError("You cannoy access this resource");
  if (!petition.ok) throw new HttpError(`status: ${petition.status}`);
}
