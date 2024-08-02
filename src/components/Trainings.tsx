import "@/css/Trainings.css";

import Swal from "sweetalert2";

import { Training as TrainingInterface } from "..";

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
  return (
    <main id="main">
      <h1>Home</h1>
      <section className="trainings-section">
        {trainings.map(({ _id, date, duration, exercises }) => {
          console.log(date);

          const parsedDate = date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const numberOfSets = exercises.reduce((totalSets, exercise) => {
            return totalSets + exercise.sets.length;
          }, 0);

          const handleDelete = async () => {
            const { status, message } = await deleteTraining(`${_id}`);

            if (status === "error") {
              Swal.fire("Error", message, "error");
            } else {
              setTrainings((prevState: TrainingInterface[]) => {
                const newState = prevState.filter(
                  e => e._id?.toString() !== _id
                );

                return newState;
              });

              Swal.fire("Success", message, "success");
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
        })}
      </section>
    </main>
  );
}
