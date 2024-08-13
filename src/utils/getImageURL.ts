import { ROUTES } from "@/services/constants";

export function getImageURL(imageName: string) {
  return ROUTES.URI + ROUTES.GET_IMAGE(imageName);
}
