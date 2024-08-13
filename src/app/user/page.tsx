"use client";

import { Training } from "@/index";

import Container from "@/components/Container";
import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";

import { useUser } from "@/hooks/useUser";
import { useTrainings } from "@/hooks/useTrainings";

import { useMemo } from "react";

export default function UserPage() {
  const { user, loading, error } = useUser();
  const { trainings, setTrainings } = useTrainings();

  const userName = user?.name;

  const numberOfTrainings = trainings.length;
  const totalTrainingsDuration = useMemo(
    () =>
      trainings.reduce((totalDuration: number, training: Training) => {
        return totalDuration + training.duration;
      }, 0),
    [trainings]
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Fetching trainings failed</h2>;

  return (
    <Container
      style={{
        display: "grid",
        gridTemplateColumns: "80% 15%",
      }}
    >
      <Aside />
      <Trainings setTrainings={setTrainings} trainings={trainings} />
      <UserAside
        name={userName ?? ""}
        numberOfTrainings={numberOfTrainings}
        totalTrainingsDuration={totalTrainingsDuration}
      />
    </Container>
  );
}
