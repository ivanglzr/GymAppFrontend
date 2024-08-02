"use client";

import { useEffect, useState } from "react";

import { Training } from "@/index";

import { getUser } from "@/services/user";

import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";

export default function UserPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUser()
      .then(({ user: { trainings } }) => {
        const trainingsParsed = trainings.map((training: Training) => {
          return {
            ...training,
            date: new Date(training.date),
          };
        });

        setTrainings(trainingsParsed);
      })
      .catch(_ => setError(true));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "75% 20%",
        paddingLeft: "5%",
      }}
    >
      {!error && (
        <>
          <Aside />
          <Trainings setTrainings={setTrainings} trainings={trainings} />
        </>
      )}
      {error && <h2>Fetching trainings failed</h2>}
    </div>
  );
}
