"use client";

import "@/css/Trainings.css";

import { Training as TrainingInterface } from "../index.d";

import { deleteTraining } from "@/services/training";

import Training from "./Training";

import { useCallback, useContext } from "react";
import { TrainingsContext } from "@/context/trainings";

export default function Trainings() {
  const { trainings, setTrainings, error, loading } =
    useContext(TrainingsContext);

  const trainingsHTML = useCallback(() => {
    return trainings?.map(({ _id, date, duration, exercises }) => {
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

          setTrainings((prevState: TrainingInterface[] | undefined) => {
            if (!prevState) {
              return [];
            }

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
  }, [trainings, setTrainings]);

  if (error) return <h2>An error occurred</h2>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <main className="trainings-container">
      <h1>Home</h1>
      <section className="trainings-section">
        {trainings?.length !== 0 ? (
          trainingsHTML()
        ) : (
          <h2>You don't have any trainings</h2>
        )}
      </section>
    </main>
  );
}
