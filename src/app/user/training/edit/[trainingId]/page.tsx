"use client";

import Swal from "sweetalert2";

import { Training } from "@/index";

import EditTrainingForm from "@/components/EditTrainingForm";

import { useState, useEffect } from "react";

import { getTraining } from "@/services/training";

export default function EditTrainingPage({
  params: { trainingId },
}: {
  params: { trainingId: string };
}) {
  const [training, setTraining] = useState<Training | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getTraining(trainingId)
      .then(res => {
        if (!res.training) {
          throw new Error("There isn't a training");
        }

        const parsedTraining = {
          ...res.training,
          date: new Date(res.training.date),
        };

        if (res.status === "error")
          return Swal.fire("Error", res.message, "error");

        setTraining(parsedTraining);
      })
      .catch(err => {
        console.error(err);

        setError(true);
      });
  }, [trainingId]);

  return (
    <>
      {!error && training && (
        <EditTrainingForm
          trainingId={trainingId}
          training={training}
          setTraining={
            setTraining as React.Dispatch<React.SetStateAction<Training>>
          }
        />
      )}
      {error && <h2>Couldn&apos;t get training</h2>}
    </>
  );
}
