import {
  SignInInterface,
  LogInInterface,
  Training,
  UserExercise,
  muscularGroups,
  exerciseEquipments,
} from "@/index.d";

export function validateSignInForm({
  name,
  email,
  password,
  age,
  weight,
  height,
}: SignInInterface): string | null {
  let error: string | null = null;

  if (!name || !email || !password || !age || !weight || !height) {
    error = "There is data missing";
  }

  if (name.length < 3) {
    error = "Name is too short";
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    error = "Email isn't valid";
  }

  if (password.length < 8) {
    error = "Password is too short";
  }

  if (age < 12) {
    error = "You're too young";
  }

  return error;
}

export function validateLogInForm({
  email,
  password,
}: LogInInterface): string | null {
  let error: string | null = null;

  if (!email || !password) {
    error = "There is data missing";
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    error = "Email isn't valid";
  }

  if (password.length < 8) {
    error = "Password is too short";
  }

  return error;
}

export function validateTrainingForm(training: Training): string | null {
  let error: string | null = null;

  // Validar la fecha
  if (!(training.date instanceof Date) || isNaN(training.date.getTime())) {
    error = "La fecha es inválida.";
  }

  // Validar la duración
  if (typeof training.duration !== "number" || training.duration <= 0) {
    error = "La duración debe ser un número positivo.";
  }

  // Validar ejercicios
  if (!Array.isArray(training.exercises) || training.exercises.length === 0) {
    error = "Debe haber al menos un ejercicio.";
  }

  training.exercises.forEach((exercise, index) => {
    // Validar nombre del ejercicio
    if (typeof exercise.name !== "string" || exercise.name.trim() === "") {
      error = `El nombre del ejercicio ${index + 1} es inválido.`;
    }

    // Validar sets del ejercicio
    if (!Array.isArray(exercise.sets) || exercise.sets.length === 0) {
      error = `El ejercicio ${index + 1} debe tener al menos un set.`;
    }

    exercise.sets.forEach((set, setIndex) => {
      // Validar peso del set
      if (typeof set.weight !== "number" || set.weight < 0) {
        error = `El peso del set ${setIndex + 1} del ejercicio ${
          index + 1
        } debe ser un número positivo.`;
      }
      // Validar repeticiones del set
      if (typeof set.reps !== "number" || set.reps < 0) {
        error = `El número de repeticiones del set ${
          setIndex + 1
        } del ejercicio ${index + 1} debe ser un número positivo.`;
      }
    });
  });

  return error;
}

export function validateExerciseForm({
  name,
  description,
  muscle,
  equipment,
}: UserExercise): string | null {
  let error: string | null = null;

  if (!name || !muscle || !equipment) {
    error = "There is data missing";
  }

  if (typeof name !== "string" || name.length <= 1) {
    error = "Name isn't valid";
  }

  if (description && typeof description !== "string") {
    error = "Description isn't valid";
  }

  if (typeof muscle !== "string" || !muscularGroups.includes(muscle)) {
    error = "Muscle isn't valid";
  }

  if (
    typeof equipment !== "string" ||
    !exerciseEquipments.includes(equipment)
  ) {
    error = "Equipment isn't valid";
  }

  return error;
}
