"use client";

import "@/css/Trainings.css";

import { Training as TrainingInterface } from "../index.d";

import { deleteTraining } from "@/services/training";

import Training from "./Training";

import { useCallback } from "react";
import { useTrainings } from "@/hooks/useTrainings";

export default function Trainings() {
  const { trainings, setTrainings, error, loading } = useTrainings();

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const { message } = await deleteTraining(id);

        setTrainings((prevState: TrainingInterface[] | undefined) => {
          if (!prevState) {
            return [];
          }

          const newState = prevState.filter((e) => e._id?.toString() !== id);

          return newState;
        });

        alert(message);
      } catch (error) {
        alert(error);
      }
    },
    [deleteTraining, setTrainings]
  );

  const trainingsHTML = useCallback(() => {
    return trainings?.map((training) => {
      const parsedTraining: TrainingInterface = {
        ...training,
        date: new Date(training.date),
      };

      return (
        <Training
          key={training._id}
          training={parsedTraining}
          handleDelete={handleDelete}
        />
      );
    });
  }, [trainings, setTrainings]);

  if (error)
    return (
      <main className="trainings-container">
        <h2>An error occurred</h2>
      </main>
    );

  if (loading)
    return (
      <main className="trainings-container">
        <h2>Loading...</h2>
      </main>
    );

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
