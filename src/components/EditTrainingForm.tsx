import "@/css/Forms.css";

import { Exercise, Training } from "../index";
import { Dispatch, SetStateAction } from "react";

import Swal from "sweetalert2";

import { validateEditTrainingForm } from "@/utils/validateForm";

import { putTraining } from "@/services/training";

export default function EditTrainingForm({
  trainingId,
  training,
  setTraining,
}: {
  trainingId: string;
  training: Training;
  setTraining: Dispatch<SetStateAction<Training>>;
}) {
  const year = training.date.getFullYear();
  const month = String(training.date.getMonth() + 1).padStart(2, "0");
  const day = String(training.date.getDate()).padStart(2, "0");

  const parsedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const parsedDate = new Date(data.date as string);

    let training: Training = {
      date: new Date(parsedDate),
      duration: Number(data.duration as string),
      exercises: [],
    };

    let numOfExercises = 0;

    for (const key of Object.keys(data)) {
      if (key.length === 1) {
        numOfExercises++;
      }
    }

    for (
      let exerciseIndex = 1;
      exerciseIndex <= numOfExercises;
      exerciseIndex++
    ) {
      let exercise: Exercise = {
        name: data[`${exerciseIndex}`] as string,
        sets: [],
      };

      let numOfSets = 0;

      for (const key of Object.keys(data)) {
        if (key.startsWith(`${exerciseIndex}`) && key.length !== 1) {
          numOfSets += 0.5;
        }
      }

      for (let setIndex = 1; setIndex <= numOfSets; setIndex++) {
        exercise.sets.push({
          weight: Number(data[`${exerciseIndex}-${setIndex}-w`] as string),
          reps: Number(data[`${exerciseIndex}-${setIndex}-r`] as string),
        });
      }

      training.exercises.push(exercise);
    }

    try {
      validateEditTrainingForm(training);

      const res = await putTraining(trainingId, training);

      if (res.status === "error")
        return Swal.fire("Error", res.message, "error");

      Swal.fire("Success", res.message, "success");
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

          console.log(newSets);

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
          <div className="form-group" key={exerciseIndex}>
            <label htmlFor={exerciseIndex.toString()}>
              Exercise {exerciseIndex}
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
                  key={`${exerciseIndex}-${setIndex}`}
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
