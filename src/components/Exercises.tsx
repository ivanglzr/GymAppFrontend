import "@/css/Exercises.css";

import { UserExercise } from "../index.d";
import Exercise from "./Exercise";

export default function Exercises({
  exercises,
}: {
  exercises: Array<UserExercise>;
}) {
  return (
    <main className="exercises-container">
      <h1>Exercises</h1>
      {exercises.map((exercise: UserExercise) => (
        <Exercise key={exercise._id} exercise={exercise} />
      ))}
    </main>
  );
}
