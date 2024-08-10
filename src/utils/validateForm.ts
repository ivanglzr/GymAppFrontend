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
  if (!name || !email || !password || !age || !weight || !height) {
    return "There is data missing";
  }

  if (name.length < 3) {
    return "Name is too short";
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    return "Email isn't valid";
  }

  if (password.length < 8) {
    return "Password is too short";
  }

  if (age < 12) {
    return "You're too young";
  }

  return null;
}

export function validateLogInForm({
  email,
  password,
}: LogInInterface): string | null {
  if (!email || !password) {
    return "There is data missing";
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    return "Email isn't valid";
  }

  if (password.length < 8) {
    return "Password is too short";
  }

  return null;
}

export function validateTrainingForm(training: Training): string | null {
  // Validar la fecha
  if (!(training.date instanceof Date) || isNaN(training.date.getTime())) {
    return "La fecha es inválida.";
  }

  // Validar la duración
  if (typeof training.duration !== "number" || training.duration <= 0) {
    return "La duración debe ser un número positivo.";
  }

  // Validar ejercicios
  if (!Array.isArray(training.exercises) || training.exercises.length === 0) {
    return "Debe haber al menos un ejercicio.";
  }

  training.exercises.forEach((exercise, index) => {
    // Validar nombre del ejercicio
    if (typeof exercise.name !== "string" || exercise.name.trim() === "") {
      return `El nombre del ejercicio ${index + 1} es inválido.`;
    }

    // Validar sets del ejercicio
    if (!Array.isArray(exercise.sets) || exercise.sets.length === 0) {
      return `El ejercicio ${index + 1} debe tener al menos un set.`;
    }

    exercise.sets.forEach((set, setIndex) => {
      // Validar peso del set
      if (typeof set.weight !== "number" || set.weight < 0) {
        return `El peso del set ${setIndex + 1} del ejercicio ${
          index + 1
        } debe ser un número positivo.`;
      }
      // Validar repeticiones del set
      if (typeof set.reps !== "number" || set.reps < 0) {
        return `El número de repeticiones del set ${
          setIndex + 1
        } del ejercicio ${index + 1} debe ser un número positivo.`;
      }
    });
  });

  return null;
}

export function validateExerciseForm({
  name,
  description,
  muscle,
  equipment,
}: UserExercise): string | null {
  if (!name || !muscle || !equipment) {
    return "There is data missing";
  }

  if (typeof name !== "string" || name.length <= 1) {
    return "Name isn't valid";
  }

  if (description && typeof description !== "string") {
    return "Description isn't valid";
  }

  if (typeof muscle !== "string" || !muscularGroups.includes(muscle)) {
    return "Muscle isn't valid";
  }

  if (
    typeof equipment !== "string" ||
    !exerciseEquipments.includes(equipment)
  ) {
    return "Equipment isn't valid";
  }

  return null;
}
