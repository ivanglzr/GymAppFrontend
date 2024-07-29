import { SignInInterface } from "@/index";

export function validateForm({
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
