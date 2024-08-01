const form = document.querySelector("#form");

let training = {
  duration: 60,
  date: new Date("19 Feb"),
  exercises: [
    {
      name: "Push ups",
      sets: [
        {
          reps: 12,
          weight: 0,
        },
      ],
    },
  ],
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  let numOfExercises = 0;

  let exercises = [];

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
    let exercise = {
      name: data[`${exerciseIndex}`],
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
        weight: data[`${exerciseIndex}-${setIndex}-w`],
        reps: data[`${exerciseIndex}-${setIndex}-r`],
      });
    }

    exercises.push(exercise);
  }

  console.log(exercises);
});
