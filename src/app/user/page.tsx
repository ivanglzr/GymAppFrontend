"use client";

import { useEffect, useRef, useState } from "react";

import { Training, User } from "@/index";

import { getUser } from "@/services/user";

import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";

export default function UserPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState(false);
  const userName = useRef<string>("");
  const totalTrainingsDuration = useRef<number>(0);

  useEffect(() => {
    getUser()
      .then(({ user: { trainings, name } }) => {
        const trainingsParsed = trainings.map((training: Training) => {
          return {
            ...training,
            date: new Date(training.date),
          };
        });

        totalTrainingsDuration.current = trainings.reduce(
          (totalDuration: number, training: Training) => {
            return totalDuration + training.duration;
          },
          0
        );
        userName.current = name;

        setTrainings(trainingsParsed);
      })
      .catch((_) => setError(true));
  }, []);

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
            totalTrainingsDuration={totalTrainingsDuration.current}
          />
        </>
      )}
      {error && <h2>Fetching trainings failed</h2>}
    </div>
  );
}
