import "@/css/Exercises.css";

import { UserExercise } from "../index.d";
import Exercise from "./Exercise";

export default function Exercises({
  exercises,
}: {
  exercises: Array<UserExercise>;
}) {
  return (
    <main id="main">
      <h1>Exercises</h1>
      {exercises.map(exercise => (
        <Exercise exercise={exercise} key={exercise._id} />
      ))}
    </main>
  );
}
