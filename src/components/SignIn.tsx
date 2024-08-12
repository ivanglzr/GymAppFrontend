"use client";

import "@/css/Forms.css";

import { validateSignInForm } from "@/utils/validateForm";

import { BackendResponse, SignInInterface, User } from "../index.d";

import { postUser } from "@/services/user";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const formDataTyped: SignInInterface = {
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      age: parseInt(data.age as string, 10),
      weight: parseInt(data.weight as string, 10),
      height: parseInt(data.height as string, 10),
    };

    const error = validateSignInForm(formDataTyped);

    if (error) {
      alert(error);
      return;
    }

    try {
      const user: User = {
        ...formDataTyped,
        trainings: [],
      };

      const res: BackendResponse = await postUser(user);

      if (res.status === "error") {
        throw new Error(res.message);
      }

      alert(res.message);

      router.push("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
        />
      </div>
      <div className="numeric-data">
        <div className="numeric-data-group">
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" autoComplete="age" />
        </div>
        <div className="numeric-data-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            id="weight"
            autoComplete="weight"
          />
        </div>
        <div className="numeric-data-group">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            id="height"
            autoComplete="height"
          />
        </div>
      </div>

      <button type="submit" id="btn-submit">
        Submit
      </button>

      <Link href="/login">Already have an account?</Link>
    </form>
  );
}
