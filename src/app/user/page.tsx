"use client";

import { useEffect, useRef, useState } from "react";

import { Training } from "@/index";

import { getUser } from "@/services/user";

import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";

export default function UserPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState<boolean>(false);
  const userName = useRef<string>("");

  useEffect(() => {
    getUser()
      .then(({ user: { trainings, name } }) => {
        const trainingsParsed = trainings.map((training: Training) => {
          return {
            ...training,
            date: new Date(training.date),
          };
        });

        userName.current = name;

        setTrainings(trainingsParsed);
      })
      .catch(_ => setError(true));
  }, []);

  //TODO: Optimize this component by making it SSR

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "80% 16%",
        paddingLeft: "5%",
      }}
    >
      {!error && (
        <>
          <Aside />
          <Trainings setTrainings={setTrainings} trainings={trainings} />
          <UserAside
            name={userName.current}
            numberOfTrainings={trainings.length}
            totalTrainingsDuration={trainings.reduce(
              (totalDuration: number, training: Training) => {
                return totalDuration + training.duration;
              },
              0
            )}
          />
        </>
      )}
      {error && <h2>Fetching trainings failed</h2>}
    </div>
  );
}
