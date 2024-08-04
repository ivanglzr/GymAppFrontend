import {
  Training,
  TrainingReducerActions,
  TrainingReducerActionTypes,
} from "../index.d";

export function TrainingReducer(
  state: Training,
  action: TrainingReducerActionTypes
): Training {
  const { type } = action;

  if (type === TrainingReducerActions.ADD_EXERCISE) {
    return {
      ...state,
      exercises: [
        ...state.exercises,
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
  }

  if (type === TrainingReducerActions.ADD_SET) {
    const newExercises = state.exercises.map((exercise, index) => {
      if (index === action.payload) {
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
      ...state,
      exercises: newExercises,
    };
  }

  if (type === TrainingReducerActions.DELETE_EXERCISE) {
    const newExercises = state.exercises.filter((_, i) => i !== action.payload);

    return {
      ...state,
      exercises: newExercises,
    };
  }

  if (type === TrainingReducerActions.DELETE_SET) {
    const { exerciseIndex, setIndex } = action.payload;

    const newExercises = state.exercises.map((exercise, index) => {
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
      ...state,
      exercises: newExercises,
    };
  }

  return state;
}
