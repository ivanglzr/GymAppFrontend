import "@/css/UserAside.css";

import Link from "next/link";

export default function UserAside({
  name,
  numberOfTrainings,
  totalTrainingsDuration,
}: {
  name: string;
  numberOfTrainings: number;
  totalTrainingsDuration: number;
}) {
  return (
    <aside id="user-aside">
      <h2>{name}</h2>
      <div className="training-info-div">
        <h3 className="training-info-title subtitle">Trainings</h3>
        <span className="training-info-span">{numberOfTrainings}</span>
      </div>
      <div className="training-info-div">
        <h3 className="training-info-title subtitle">Total Time</h3>
        <span className="training-info-span">
          {(totalTrainingsDuration / 60).toFixed(2)} h
        </span>
      </div>
      <Link href="/user/training/create" className="link-add-exercise">
        <i className="fa-solid fa-plus"></i> Create Training
      </Link>
    </aside>
  );
}
