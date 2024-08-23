"use client";

import "@/css/UserAside.css";

import { TrainingsContext } from "@/context/trainings";
import { UserContext } from "@/context/user";

import { useContext, useMemo } from "react";

import Link from "next/link";

import { Training } from "../index.d";

export default function UserAside() {
  const {
    user,
    error: userError,
    loading: userLoading,
  } = useContext(UserContext);
  const {
    trainings,
    error: trainingsError,
    loading: trainingsLoading,
  } = useContext(TrainingsContext);

  const userName = useMemo(() => user?.name, [user]);

  const numberOfTrainings = useMemo(() => trainings?.length, [trainings]);
  const totalTrainingsDuration =
    useMemo(
      () =>
        trainings?.reduce((totalDuration: number, training: Training) => {
          return totalDuration + training.duration;
        }, 0),
      [trainings]
    ) ?? 0;

  if (userError || trainingsError)
    return <h2>An error occurred while fetching the data</h2>;
  if (userLoading || trainingsLoading) return <h2>Loading...</h2>;

  return (
    <aside id="user-aside">
      <h2>{userName}</h2>
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
