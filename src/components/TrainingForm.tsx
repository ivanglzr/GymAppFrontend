"use client";

import "@/css/Forms.css";

import { useCallback, useMemo, useRef } from "react";

import Swal from "sweetalert2";

import { Training } from "../index.d";

import { useRouter } from "next/navigation";

import { postTraining, putTraining } from "@/services/training";

import { validateTrainingForm } from "@/utils/validateForm";

import { useTrainingReducer } from "@/hooks/useTrainingReducer";

const generateUniqueKey = () => crypto.randomUUID();

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
    setTraining,
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
      exerciseKeysRef.current[exerciseIndex] = generateUniqueKey();
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
      exerciseSets[setIndex] = generateUniqueKey();
    }

    return exerciseSets[setIndex];
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const error = validateTrainingForm(training);

      if (error) {
        Swal.fire("Error", error, "error");
        return;
      }

      try {
        let res;

        if (isEditTraining) res = await putTraining(trainingId, training);
        else if (!isEditTraining) res = await postTraining(training);

        if (res.status === "error") {
          throw new Error(res.message);
        }

        Swal.fire("Success", res.message, "success");

        router.push("/user");
      } catch (err) {
        Swal.fire("Error", `${err}`, "error");
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

  const setExerciseName = (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseIndex: number
  ) => {
    const newExercises = structuredClone(training.exercises);
    newExercises[exerciseIndex].name = event.currentTarget.value;

    setTraining({
      ...training,
      exercises: newExercises,
    });
  };

  const setSetWeight = (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newExercises = structuredClone(training.exercises);
    newExercises[exerciseIndex].sets[setIndex].weight =
      event.currentTarget.valueAsNumber;

    setTraining({
      ...training,
      exercises: newExercises,
    });
  };

  const setSetReps = (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const newExercises = structuredClone(training.exercises);
    newExercises[exerciseIndex].sets[setIndex].reps =
      event.currentTarget.valueAsNumber;

    setTraining({
      ...training,
      exercises: newExercises,
    });
  };

  console.log("render");

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h1>{isEditTraining ? "Edit Training" : "Create Training"}</h1>
      <div className="form-group-duration">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          id="duration"
          onChange={event =>
            setTraining({
              ...training,
              duration: event.currentTarget.valueAsNumber,
            })
          }
          value={training.duration}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={event =>
            setTraining({
              ...training,
              date: new Date(event.currentTarget.value),
            })
          }
          value={parsedDate}
        />
      </div>
      {training.exercises.map((exercise, exerciseIndex) => {
        const exerciseKey = exercise._id ?? getExerciseKey(exerciseIndex);

        return (
          <div className="form-group" key={exerciseKey}>
            <label htmlFor={`exercise-${exerciseIndex + 1}-${exerciseKey}`}>
              Exercise {exerciseIndex + 1}{" "}
              <button
                type="button"
                onClick={() => handleDeleteExercise(exerciseIndex)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </label>
            <input
              type="text"
              name={`exercise-${exerciseIndex + 1}-${exerciseKey}`}
              id={`exercise-${exerciseIndex + 1}-${exerciseKey}`}
              onChange={event => setExerciseName(event, exerciseIndex)}
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
                      onClick={() => handleDeleteSet(exerciseIndex, setIndex)}
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
                        onChange={event =>
                          setSetWeight(event, exerciseIndex, setIndex)
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
                        id={`set-${exerciseIndex + 1}-${
                          setIndex + 1
                        }-${setKey}-reps`}
                        onChange={event =>
                          setSetReps(event, exerciseIndex, setIndex)
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
