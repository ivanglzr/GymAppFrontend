import Aside from "@/components/Aside";
import Container from "@/components/Container";
import Exercises from "@/components/Exercises";

export default function UserExercisesPage() {
  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <Aside />
      <Exercises />
    </Container>
  );
}
