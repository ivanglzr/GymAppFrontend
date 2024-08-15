import { UserExercise } from "../index.d";

import { getImageURL } from "@/utils/getImageURL";

export default function Exercise({ exercise }: { exercise: UserExercise }) {
  const imageURL = getImageURL(exercise.image ?? "");

  return (
    <article className="exercise-article">
      <img src={imageURL} alt="img" className="exercise-img" />
      <div className="exercise-info">
        <h2 className="subtitle exercise-info-title">{exercise.name}</h2>
        <p className="exercise-info-description">{exercise.description}</p>
        <div className="exercise-data">
          <div className="exercise-data-div">
            <h3 className="subtitle exercise-data-title">Muscle</h3>
            <span className="exercise-data-span">{exercise.muscle}</span>
          </div>
          <div className="exercise-data-div">
            <h3 className="subtitle exercise-data-title">Equipment</h3>
            <span className="exercise-data-span">{exercise.equipment}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
