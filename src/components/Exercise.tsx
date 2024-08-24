import { UserExercise } from "../index.d";

import { getImageURL } from "@/utils/getImageURL";
import { useRouter } from "next/navigation";

export default function Exercise({ exercise }: { exercise: UserExercise }) {
  const router = useRouter();

  const imageURL = getImageURL(exercise.image ?? "");

  return (
    <article className="exercise-article">
      <img src={imageURL} alt="img" className="exercise-img" />
      <div className="exercise-info">
        <header className="exercise-header">
          <h2 className="subtitle exercise-info-title">{exercise.name}</h2>
          <div className="header-buttons">
            <button
              onClick={() => router.push(`/user/exercise/edit/${exercise._id}`)}
            >
              <i className="fa-solid fa-pen-to-square fa-xl"></i>
            </button>
            <button>
              <i className="fa-solid fa-trash fa-xl"></i>
            </button>
          </div>
        </header>
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
