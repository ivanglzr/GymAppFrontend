"use client";

import "@/css/Forms.css";

import { useCallback, useMemo, useRef } from "react";

import ExerciseFormGroup from "./ExerciseFormGroup";

import { BackendResponse, Training } from "../index.d";

import { useRouter } from "next/navigation";

import { postTraining, putTraining } from "@/services/training";

import { validateTrainingForm } from "@/utils/validateForm";
import { generateRandomKey } from "@/utils/generateRandomKey";

import { useTrainingReducer } from "@/hooks/useTrainingReducer";
import { useTrainingsContext } from "@/hooks/useTrainingsContext";

const getParsedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function TrainingForm({
  isEditTraining,
  trainingId = "",
  training: initialTraining = {
    duration: 0,
    date: new Date(Date.now()),
    exercises: [
      {
        name: "",
        sets: [
          {
            reps: 0,
            weight: 0,
          },
        ],
      },
    ],
  },
}: {
  isEditTraining: boolean;
  trainingId?: string;
  training?: Training;
}) {
  const {
    training,
    setDuration,
    setDate,
    setExerciseName,
    setSetWeight,
    setSetReps,
    addExercise,
    addSet,
    deleteExercise,
    deleteSet,
  } = useTrainingReducer(initialTraining);

  const { refetchTrainings } = useTrainingsContext();

  const router = useRouter();

  const parsedDate = useMemo(
    () => getParsedDate(training.date),
    [training.date]
  );

  const exerciseKeysRef = useRef<Array<string>>([]);
  const setKeysRef = useRef<Array<Array<string>>>([]);

  const getExerciseKey = (exerciseIndex: number) => {
    if (!exerciseKeysRef.current[exerciseIndex]) {
      exerciseKeysRef.current[exerciseIndex] = generateRandomKey();
    }
    return exerciseKeysRef.current[exerciseIndex];
  };

  const getSetKey = (exerciseIndex: number, setIndex: number) => {
    let exerciseSets = setKeysRef.current[exerciseIndex];

    if (!exerciseSets) {
      exerciseSets = [];
      setKeysRef.current[exerciseIndex] = exerciseSets;
    }

    if (!exerciseSets[setIndex]) {
      exerciseSets[setIndex] = generateRandomKey();
    }

    return exerciseSets[setIndex];
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationError = validateTrainingForm(training);

      if (validationError) {
        alert(validationError);
        return;
      }

      try {
        const res: BackendResponse = isEditTraining
          ? await putTraining(trainingId, training)
          : await postTraining(training);

        alert(res.message);

        refetchTrainings();

        router.push("/user");
      } catch (err) {
        alert(err);
      }
    },
    [isEditTraining, trainingId, training, router, refetchTrainings]
  );

  const handleDeleteExercise = useCallback(
    (exerciseIndex: number) => {
      deleteExercise(exerciseIndex);
      exerciseKeysRef.current.splice(exerciseIndex, 1);
      setKeysRef.current.splice(exerciseIndex, 1);
    },
    [deleteExercise]
  );

  const handleDeleteSet = useCallback(
    (exerciseIndex: number, setIndex: number) => {
      deleteSet(exerciseIndex, setIndex);

      if (!setKeysRef.current[exerciseIndex]) return;

      setKeysRef.current[exerciseIndex].splice(setIndex, 1);
    },
    [deleteSet]
  );

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h1>{isEditTraining ? "Edit Training" : "Create Training"}</h1>
      <div className="form-group-duration">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          id="duration"
          onChange={(event) => setDuration(event.currentTarget.valueAsNumber)}
          value={training.duration}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={(event) => setDate(new Date(event.currentTarget.value))}
          value={parsedDate}
        />
      </div>
      {training.exercises.map((exercise, exerciseIndex) => {
        const exerciseKey = exercise._id ?? getExerciseKey(exerciseIndex);

        const props = {
          exercise,
          exerciseIndex,
          exerciseKey,
          setExerciseName,
          addSet,
          setSetWeight,
          setSetReps,
          deleteExercise: handleDeleteExercise,
          deleteSet: handleDeleteSet,
          getSetKey,
        };

        return <ExerciseFormGroup key={exerciseKey} {...props} />;
      })}

      <button
        type="button"
        className="btn-add"
        id="btn-add-exercise"
        onClick={addExercise}
      >
        <i className="fa-solid fa-plus"></i> Add exercise
      </button>

      <button type="submit" id="btn-submit">
        Submit
      </button>
    </form>
  );
}
