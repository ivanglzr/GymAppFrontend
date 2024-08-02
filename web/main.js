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

form.addEventListener("submit", e => {
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

const btnAddExercise = document.querySelector("#btn-add-exercise");

btnAddExercise.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("form-group");
  div.innerHTML = `
        <label for="3">Exercise 3</label>
        <input type="text" name="3" id="3" value="Push ups" />

        <div class="sets-form-group">
          <h3>Set 1</h3>
          <div class="set-divs-container">
            <div class="sets-form-group-div">
              <label for="3-1-w">Weight</label>
              <input type="number" name="3-1-w" id="3-1-w" value="0" />
            </div>
            <div class="sets-form-group-div">
              <label for="3-1-r">Reps</label>
              <input type="number" name="3-1-r" id="3-1-r" value="12" />
            </div>
          </div>
        </div>
        <div class="sets-form-group">
          <h3>Set 2</h3>
          <div class="set-divs-container">
            <div class="sets-form-group-div">
              <label for="3-2-w">Weight</label>
              <input type="number" name="3-2-w" id="3-2-w" value="0" />
            </div>
            <div class="sets-form-group-div">
              <label for="3-2-r">Reps</label>
              <input type="number" name="3-2-r" id="3-2-r" value="12" />
            </div>
          </div>
        </div>
  `;

  form.appendChild(div);
});
