"use client";

import "@/css/Trainings.css";

import { Training as TrainingInterface } from "../index.d";

import { deleteTraining } from "@/services/training";

import Training from "./Training";

import { useCallback } from "react";
import { useTrainingsContext } from "@/hooks/useTrainingsContext";

export default function Trainings() {
  const { trainings, setTrainings, error, loading } = useTrainingsContext();

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
      return <Training training={training} handleDelete={handleDelete} />;
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
