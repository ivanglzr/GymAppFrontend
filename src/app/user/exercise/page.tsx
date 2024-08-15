"use client";

import Aside from "@/components/Aside";
import Container from "@/components/Container";
import Exercises from "@/components/Exercises";

import { useExercises } from "@/hooks/useExercises";

export default function UserExercisesPage() {
  const { exercises, error, loading } = useExercises();

  if (error) {
    return <h2>An error occurred</h2>;
  }

  //TODO: if user doesn't have any exercises loading lasts forever. Fix it
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <Aside />
      {exercises && <Exercises exercises={exercises} />}
    </Container>
  );
}
