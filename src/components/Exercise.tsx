import { UserExercise } from "../index.d";

import { getImageURL } from "@/utils/getImageURL";

export default function Exercise({ exercise }: { exercise: UserExercise }) {
  const imageURL = getImageURL(exercise.image);

  return (
    <article>
      <img src={imageURL} width={200} height={200} alt="img" />
      <h2>{exercise.name}</h2>
    </article>
  );
}
