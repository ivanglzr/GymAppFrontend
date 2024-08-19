"use client";

import "@/css/Forms.css";

import { useCallback, useMemo, useRef } from "react";

import { BackendResponse, Exercise, Training } from "../index.d";

import { useRouter } from "next/navigation";

import { postTraining, putTraining } from "@/services/training";

import { validateTrainingForm } from "@/utils/validateForm";
import { generateRandomKey } from "@/utils/generateRandomKey";

import { useTrainingReducer } from "@/hooks/useTrainingReducer";

const getParsedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

type ExerciseFormProps = {
  exercise: Exercise;
  exerciseIndex: number;
  exerciseKey: string;
  setExerciseName: (exerciseIndex: number, name: string) => void;
  addSet: (exerciseIndex: number) => void;
  setSetWeight: (
    exerciseIndex: number,
    setIndex: number,
    weight: number
  ) => void;
  setSetReps: (exerciseIndex: number, setIndex: number, reps: number) => void;
  deleteExercise: (exerciseIndex: number) => void;
  deleteSet: (exerciseIndex: number, setIndex: number) => void;
  getSetKey: (exerciseIndex: number, setIndex: number) => string;
};

function ExerciseForm({
  exercise,
  exerciseIndex,
  exerciseKey,
  setExerciseName,
  addSet,
  setSetWeight,
  setSetReps,
  deleteExercise,
  deleteSet,
  getSetKey,
}: ExerciseFormProps) {
  return (
    <div className="form-group" key={exerciseKey}>
      <label htmlFor={`exercise-${exerciseIndex + 1}-${exerciseKey}`}>
        Exercise {exerciseIndex + 1}{" "}
        <button type="button" onClick={() => deleteExercise(exerciseIndex)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </label>
      <input
        type="text"
        name={`exercise-${exerciseIndex + 1}-${exerciseKey}`}
        id={`exercise-${exerciseIndex + 1}-${exerciseKey}`}
        onChange={(event) =>
          setExerciseName(exerciseIndex, event.currentTarget.value)
        }
        value={exercise.name}
      />

      {exercise.sets.map((set, setIndex) => {
        const setKey = set._id ?? getSetKey(exerciseIndex, setIndex);

        return (
          <div className="sets-form-group" key={setKey}>
            <h3>
              Set {setIndex + 1}{" "}
              <button
                type="button"
                onClick={() => deleteSet(exerciseIndex, setIndex)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </h3>

            <div className="set-divs-container">
              <div className="sets-form-group-div">
                <label
                  htmlFor={`set-${exerciseIndex + 1}-${
                    setIndex + 1
                  }-${setKey}-weight`}
                >
                  Weight
                </label>
                <input
                  type="number"
                  name={`set-${exerciseIndex + 1}-${
                    setIndex + 1
                  }-${setKey}-weight`}
                  id={`set-${exerciseIndex + 1}-${
                    setIndex + 1
                  }-${setKey}-weight`}
                  onChange={(event) =>
                    setSetWeight(
                      exerciseIndex,
                      setIndex,
                      event.currentTarget.valueAsNumber
                    )
                  }
                  value={set.weight}
                />
              </div>
              <div className="sets-form-group-div">
                <label
                  htmlFor={`set-${exerciseIndex + 1}-${
                    setIndex + 1
                  }-${setKey}-reps`}
                >
                  Reps
                </label>
                <input
                  type="number"
                  name={`set-${exerciseIndex + 1}-${
                    setIndex + 1
                  }-${setKey}-reps`}
                  id={`set-${exerciseIndex + 1}-${setIndex + 1}-${setKey}-reps`}
                  onChange={(event) =>
                    setSetReps(
                      exerciseIndex,
                      setIndex,
                      event.currentTarget.valueAsNumber
                    )
                  }
                  value={set.reps}
                />
              </div>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="btn-add btn-add-set"
        onClick={() => addSet(exerciseIndex)}
      >
        <i className="fa-solid fa-plus"></i> Add set
      </button>
    </div>
  );
}

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

        router.push("/user");
      } catch (err) {
        alert(err);
      }
    },
    [isEditTraining, trainingId, training, router]
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

        const props: ExerciseFormProps = {
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

        return <ExerciseForm key={exerciseKey} {...props} />;
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
