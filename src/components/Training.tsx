"use client";

import { Training as TrainingInterface } from "../index.d";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Training({
  training: { date, duration, exercises, _id: id },
  handleDelete,
}: {
  training: TrainingInterface;
  handleDelete: (id: string) => Promise<void>;
}) {
  const router = useRouter();

  const parsedDate = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const numberOfSets = exercises.reduce((totalSets, exercise) => {
    return totalSets + exercise.sets.length;
  }, 0);

  return (
    <article className="training-div">
      <header className="training-header">
        <h2 className="training-title">
          <Link href={`/user/training/${id}`}>Training</Link>
        </h2>
        <span className="training-date subtitle">{parsedDate}</span>
        <div className="training-icons-div">
          <button
            className="btn-icon"
            onClick={() => router.push(`/user/training/edit/${id}`)}
            aria-label="Redirect user to edit training page"
          >
            <i className="fa-solid fa-pen-to-square fa-xl"></i>
          </button>
          <button
            className="btn-icon"
            onClick={() => handleDelete(`${id}`)}
            aria-label="Delete training button"
          >
            <i className="fa-solid fa-trash fa-xl"></i>
          </button>
        </div>
      </header>
      <div className="training-info">
        <div className="duration-div">
          <h3 className="duration-div-title subtitle">Duration</h3>
          <span className="duration-div-info">{duration} min</span>
        </div>
        <div className="sets-div">
          <h3 className="sets-div-title subtitle">Sets</h3>
          <span className="sets-div-info">{numberOfSets.toString()}</span>
        </div>
      </div>
      <div className="exercises-div">
        <h3 className="exercises-title subtitle">Workout</h3>
        <ul className="exercises-list">
          {exercises.map((exercise) => (
            <li className="exercise-name" key={exercise._id}>
              {`${exercise.sets.length} ${
                exercise.sets.length === 1 ? "set" : "sets"
              } ${exercise.name}`}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
