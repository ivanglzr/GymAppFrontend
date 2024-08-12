import { Training } from "@/index.d";

import Aside from "@/components/Aside";
import Trainings from "@/components/Trainings";
import UserAside from "@/components/UserAside";

import { useUser } from "@/hooks/useUser";
import { useTrainings } from "@/hooks/useTrainings";

export default function UserPage() {
  const { user, loading, error } = useUser();
  const { trainings, setTrainings } = useTrainings();

  const userName = user?.name;

  const numberOfTrainings = trainings.length;
  const totalTrainingsDuration = trainings.reduce(
    (totalDuration: number, training: Training) => {
      return totalDuration + training.duration;
    },
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "80% 15%",
      }}
    >
      {!error && !loading && (
        <>
          <Aside />
          <Trainings setTrainings={setTrainings} trainings={trainings} />
          <UserAside
            name={userName ?? ""}
            numberOfTrainings={numberOfTrainings}
            totalTrainingsDuration={totalTrainingsDuration}
          />
        </>
      )}
      {loading && <h2>Cargando...</h2>}
      {error && <h2>Fetching trainings failed</h2>}
    </div>
  );
}
