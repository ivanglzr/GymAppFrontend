import { Exercise } from "../index.d";

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

export default function ExerciseFormGroup({
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
