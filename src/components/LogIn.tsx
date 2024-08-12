"use client";

import "@/css/Forms.css";

import { useRouter } from "next/navigation";

import { BackendResponse, LogInInterface } from "../index.d";

import { validateLogInForm } from "@/utils/validateForm";

import { login } from "@/services/user";

import Link from "next/link";

export default function LogIn() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const formDataTyped: LogInInterface = {
      email: data.email as string,
      password: data.password as string,
    };

    const error = validateLogInForm(formDataTyped);

    if (error) {
      alert(error);
      return;
    }

    try {
      const res: BackendResponse = await login(
        formDataTyped.email,
        formDataTyped.password
      );

      if (res.status === "error") {
        throw new Error(res.message);
      }

      alert(res.message);

      router.push("/user/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>Log in</h1>
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
          autoComplete="current-password"
        />
      </div>

      <button type="submit" id="btn-submit">
        Submit
      </button>

      <Link href="/signin">Dont have an account?</Link>
    </form>
  );
}
