"use client";

import "@/css/Forms.css";

import { Training } from "../index";
import { Dispatch, SetStateAction } from "react";

import Swal from "sweetalert2";

import { validateEditTrainingForm } from "@/utils/validateForm";

import { putTraining } from "@/services/training";
import { getFormData } from "@/utils/getFormData";
import { useRouter } from "next/navigation";

export default function EditTrainingForm({
  trainingId,
  training,
  setTraining,
}: {
  trainingId: string;
  training: Training;
  setTraining: Dispatch<SetStateAction<Training>>;
}) {
  const router = useRouter();

  const year = training.date.getFullYear();
  const month = String(training.date.getMonth() + 1).padStart(2, "0");
  const day = String(training.date.getDate()).padStart(2, "0");

  const parsedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const training = getFormData(event.currentTarget);

    try {
      validateEditTrainingForm(training);

      const res = await putTraining(trainingId, training);

      if (res.status === "error")
        return Swal.fire("Error", res.message, "error");

      Swal.fire("Success", res.message, "success");

      router.push("/user");
    } catch (err) {
      Swal.fire("Error", `${err}`, "error");
    }
  };

  const addExercise = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setTraining(prevState => {
      return {
        ...prevState,
        exercises: [
          ...prevState.exercises,
          {
            name: "",
            sets: [
              {
                weight: 0,
                reps: 0,
              },
            ],
          },
        ],
      };
    });
  };

  const addSet = (
    event: React.MouseEvent<HTMLButtonElement>,
    exerciseIndex: number
  ) => {
    event.preventDefault();
    setTraining(prevState => {
      const newExercises = prevState.exercises.map((exercise, index) => {
        if (index === exerciseIndex) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                weight: 0,
                reps: 0,
              },
            ],
          };
        }
        return exercise;
      });

      return {
        ...prevState,
        exercises: newExercises,
      };
    });
  };

  const deleteExercise = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    exerciseIndex: number
  ) => {
    event.preventDefault();

    setTraining(prevState => {
      const newExercises = [...prevState.exercises];
      newExercises.splice(exerciseIndex, 1);

      return {
        ...prevState,
        exercises: newExercises,
      };
    });
  };

  const deleteSet = (
    event: React.MouseEvent<HTMLButtonElement>,
    exerciseIndex: number,
    setIndex: number
  ) => {
    event.preventDefault();

    setTraining(prevState => {
      const newExercises = prevState.exercises.map((exercise, index) => {
        if (index === exerciseIndex) {
          const newSets = exercise.sets.filter((_, i) => i !== setIndex);

          return {
            ...exercise,
            sets: newSets,
          };
        }

        return exercise;
      });

      return {
        ...prevState,
        exercises: newExercises,
      };
    });
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h1>Edit Training</h1>
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
        exerciseIndex++;

        return (
          <div className="form-group" key={exercise._id}>
            <label htmlFor={exerciseIndex.toString()}>
              Exercise {exerciseIndex}{" "}
              <i
                className="fa-solid fa-trash"
                onClick={event => deleteExercise(event, exerciseIndex - 1)}
              ></i>
            </label>
            <input
              type="text"
              name={exerciseIndex.toString()}
              id={exerciseIndex.toString()}
              defaultValue={exercise.name}
            />

            {exercise.sets.map((set, setIndex) => {
              setIndex++;

              return (
                <div
                  className="sets-form-group"
                  key={`${set._id}-${exerciseIndex}-${setIndex}`}
                >
                  <h3>
                    Set {setIndex}{" "}
                    <button
                      onClick={event =>
                        deleteSet(event, exerciseIndex - 1, setIndex - 1)
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </h3>

                  <div className="set-divs-container">
                    <div className="sets-form-group-div">
                      <label htmlFor={`${exerciseIndex}-${setIndex}-w`}>
                        Weight
                      </label>
                      <input
                        type="number"
                        name={`${exerciseIndex}-${setIndex}-w`}
                        id={`${exerciseIndex}-${setIndex}-w`}
                        defaultValue={set.weight}
                      />
                    </div>
                    <div className="sets-form-group-div">
                      <label htmlFor={`${exerciseIndex}-${setIndex}-r`}>
                        Reps
                      </label>
                      <input
                        type="number"
                        name={`${exerciseIndex}-${setIndex}-r`}
                        id={`${exerciseIndex}-${setIndex}-r`}
                        defaultValue={set.reps}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              className="btn-add btn-add-set"
              onClick={event => addSet(event, exerciseIndex - 1)}
            >
              <i className="fa-solid fa-plus"></i> Add set
            </button>
          </div>
        );
      })}

      <button
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
