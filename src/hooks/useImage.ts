import { getImage } from "@/services/exercise";

export async function useImage(imageName: string) {
  const imageURL = await getImage(imageName);

  return { imageURL };
}
