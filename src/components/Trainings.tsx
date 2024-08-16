import "@/css/Trainings.css";

import { Training as TrainingInterface } from "../index.d";

import { deleteTraining } from "@/services/training";

import Training from "./Training";

import { SetStateAction } from "react";

export default function Trainings({
  trainings,
  setTrainings,
}: {
  trainings: Array<TrainingInterface>;
  setTrainings: (value: SetStateAction<TrainingInterface[]>) => void;
}) {
  const trainingsHTML = trainings.map(({ _id, date, duration, exercises }) => {
    const parsedDate = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const numberOfSets = exercises.reduce((totalSets, exercise) => {
      return totalSets + exercise.sets.length;
    }, 0);

    const handleDelete = async () => {
      try {
        const { message } = await deleteTraining(`${_id}`);

        setTrainings((prevState: TrainingInterface[]) => {
          const newState = prevState.filter((e) => e._id?.toString() !== _id);

          return newState;
        });

        alert(message);
      } catch (error) {
        alert(error);
      }
    };

    return (
      <Training
        key={_id}
        id={`${_id}`}
        date={parsedDate}
        duration={duration}
        exercises={exercises}
        sets={numberOfSets}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <main className="trainings-container">
      <h1>Home</h1>
      <section className="trainings-section">
        {trainings.length !== 0 ? (
          trainingsHTML
        ) : (
          <p>You haven&apos;t created a training!</p>
        )}
      </section>
    </main>
  );
}
