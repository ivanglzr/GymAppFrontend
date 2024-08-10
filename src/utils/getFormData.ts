import { Exercise, Training } from "../index.d";

export function getFormData(form: HTMLFormElement): Training {
  const data = Object.fromEntries(new FormData(form));

  const parsedDate = new Date(`${data.date}`);

  let training: Training = {
    date: parsedDate,
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

  return training;
}
