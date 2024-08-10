"use client";

import "@/css/Forms.css";

import { useRef } from "react";

import Swal from "sweetalert2";

import { Training } from "../index.d";

import { useRouter } from "next/navigation";

import { postTraining, putTraining } from "@/services/training";

import { validateTrainingForm } from "@/utils/validateForm";
import { getFormData } from "@/utils/getFormData";

import { useTrainingReducer } from "@/hooks/useTrainingReducer";

const generateUniqueKey = () => crypto.randomUUID();

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
  const { training, addExercise, addSet, deleteExercise, deleteSet } =
    useTrainingReducer(initialTraining);

  const router = useRouter();

  const year = training.date.getFullYear();
  const month = String(training.date.getMonth() + 1).padStart(2, "0");
  const day = String(training.date.getDate()).padStart(2, "0");

  const parsedDate = `${year}-${month}-${day}`;

  const exerciseKeysRef = useRef<Map<number, string>>(new Map());
  const setKeysRef = useRef<Map<number, Map<number, string>>>(new Map());

  // Función para obtener o generar una clave única para un ejercicio
  const getExerciseKey = (exerciseIndex: number) => {
    if (!exerciseKeysRef.current.has(exerciseIndex)) {
      exerciseKeysRef.current.set(exerciseIndex, generateUniqueKey());
    }
    return exerciseKeysRef.current.get(exerciseIndex);
  };

  const getSetKey = (exerciseIndex: number, setIndex: number) => {
    let exerciseSets = setKeysRef.current.get(exerciseIndex);

    if (!exerciseSets) {
      exerciseSets = new Map<number, string>();
      setKeysRef.current.set(exerciseIndex, exerciseSets);
    }

    if (!exerciseSets.has(setIndex)) {
      exerciseSets.set(setIndex, generateUniqueKey());
    }

    return exerciseSets.get(setIndex);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const training = getFormData(event.currentTarget);

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
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h1>{isEditTraining ? "Edit Training" : "Create Training"}</h1>
      <div className="form-group-duration">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          name="duration"
          id="duration"
          defaultValue={training.duration}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" defaultValue={parsedDate} />
      </div>
      {training.exercises.map((exercise, exerciseIndex) => {
        const exerciseKey = exercise._id ?? getExerciseKey(exerciseIndex);

        return (
          <div className="form-group" key={exerciseKey}>
            <label htmlFor={(exerciseIndex + 1).toString()}>
              Exercise {exerciseIndex + 1}{" "}
              <button
                type="button"
                onClick={event => deleteExercise(event, exerciseIndex)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </label>
            <input
              type="text"
              name={(exerciseIndex + 1).toString()}
              id={(exerciseIndex + 1).toString()}
              defaultValue={exercise.name}
            />

            {exercise.sets.map((set, setIndex) => {
              const setKey = set._id ?? getSetKey(exerciseIndex, setIndex);

              return (
                <div className="sets-form-group" key={setKey}>
                  <h3>
                    Set {setIndex + 1}{" "}
                    <button
                      type="button"
                      onClick={event =>
                        deleteSet(event, exerciseIndex, setIndex)
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </h3>

                  <div className="set-divs-container">
                    <div className="sets-form-group-div">
                      <label htmlFor={`${exerciseIndex + 1}-${setIndex + 1}-w`}>
                        Weight
                      </label>
                      <input
                        type="number"
                        name={`${exerciseIndex + 1}-${setIndex + 1}-w`}
                        id={`${exerciseIndex + 1}-${setIndex + 1}-w`}
                        defaultValue={set.weight}
                      />
                    </div>
                    <div className="sets-form-group-div">
                      <label htmlFor={`${exerciseIndex + 1}-${setIndex + 1}-r`}>
                        Reps
                      </label>
                      <input
                        type="number"
                        name={`${exerciseIndex + 1}-${setIndex + 1}-r`}
                        id={`${exerciseIndex + 1}-${setIndex + 1}-r`}
                        defaultValue={set.reps}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className="btn-add btn-add-set"
              onClick={event => addSet(event, exerciseIndex)}
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
        onClick={event => addExercise(event)}
      >
        <i className="fa-solid fa-plus"></i> Add exercise
      </button>

      <button type="submit" id="btn-submit">
        Submit
      </button>
    </form>
  );
}
