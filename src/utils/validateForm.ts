import { SignInInterface, LogInInterface, Training } from "@/index";

export function validateSignInForm({
  name,
  email,
  password,
  age,
  weight,
  height,
}: SignInInterface) {
  if (!name || !email || !password || !age || !weight || !height) {
    throw new Error("There is data missing");
  }

  if (name.length < 3) {
    throw new Error("Name is too short");
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    throw new Error("Email isn't valid");
  }

  if (password.length < 8) {
    throw new Error("Password is too short");
  }

  if (age < 12) {
    throw new Error("You're too young");
  }
}

export function validateLogInForm({ email, password }: LogInInterface) {
  if (!email || !password) {
    throw new Error("There is data missing");
  }

  if (
    email.length < 5 ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1
  ) {
    throw new Error("Email isn't valid");
  }

  if (password.length < 8) {
    throw new Error("Password is too short");
  }
}

export function validateEditTrainingForm(training: Training) {
  // Validar la fecha
  if (!(training.date instanceof Date) || isNaN(training.date.getTime())) {
    throw new Error("La fecha es inválida.");
  }

  // Validar la duración
  if (typeof training.duration !== "number" || training.duration <= 0) {
    throw new Error("La duración debe ser un número positivo.");
  }

  // Validar ejercicios
  if (!Array.isArray(training.exercises) || training.exercises.length === 0) {
    throw new Error("Debe haber al menos un ejercicio.");
  }

  training.exercises.forEach((exercise, index) => {
    // Validar nombre del ejercicio
    if (typeof exercise.name !== "string" || exercise.name.trim() === "") {
      throw new Error(`El nombre del ejercicio ${index + 1} es inválido.`);
    }

    // Validar sets del ejercicio
    if (!Array.isArray(exercise.sets) || exercise.sets.length === 0) {
      throw new Error(`El ejercicio ${index + 1} debe tener al menos un set.`);
    }

    exercise.sets.forEach((set, setIndex) => {
      // Validar peso del set
      if (typeof set.weight !== "number" || set.weight < 0) {
        throw new Error(
          `El peso del set ${setIndex + 1} del ejercicio ${
            index + 1
          } debe ser un número positivo.`
        );
      }
      // Validar repeticiones del set
      if (typeof set.reps !== "number" || set.reps < 0) {
        throw new Error(
          `El número de repeticiones del set ${setIndex + 1} del ejercicio ${
            index + 1
          } debe ser un número positivo.`
        );
      }
    });
  });
}
