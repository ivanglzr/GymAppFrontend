import Container from "@/components/Container";
import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";
import { UserProvider } from "@/context/user";
import { TrainingsProvider } from "@/context/trainings";

export default function UserPage() {
  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <UserProvider>
        <TrainingsProvider>
          <Aside />
          <UserAside />
          <Trainings />
        </TrainingsProvider>
      </UserProvider>
    </Container>
  );
}
