"use client";

import { Exercise } from "../index.d";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Training({
  id,
  date,
  duration,
  exercises,
  sets,
  handleDelete,
}: {
  id: string;
  date: string;
  duration: number;
  exercises: Array<Exercise>;
  sets: number;
  handleDelete: () => Promise<void>;
}) {
  const router = useRouter();

  return (
    <article className="training-div">
      <header className="training-header">
        <h2 className="training-title">
          <Link href={`/user/training/${id}`}>Training</Link>
        </h2>
        <span className="training-date subtitle">{date}</span>
        <div className="training-icons-div">
          <button
            className="btn-icon"
            onClick={() => router.push(`/user/training/edit/${id}`)}
          >
            <i className="fa-solid fa-pen-to-square fa-xl"></i>
          </button>
          <button className="btn-icon" onClick={handleDelete}>
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
          <span className="sets-div-info">{sets.toString()}</span>
        </div>
      </div>
      <div className="exercises-div">
        <h3 className="exercises-title subtitle">Workout</h3>
        <ul className="exercises-list">
          {exercises.map(exercise => (
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
