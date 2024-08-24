import Container from "@/components/Container";
import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";

export default function UserPage() {
  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <Aside />
      <UserAside />
      <Trainings />
    </Container>
  );
}
