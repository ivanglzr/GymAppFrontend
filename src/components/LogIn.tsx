"use client";

import React from "react";

import Swal from "sweetalert2";

import "@/css/Forms.css";

import { useRouter } from "next/navigation";

import { LogInInterface } from "../index.d";

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
      Swal.fire("Error", error, "error");
      return;
    }

    try {
      const res = await login(formDataTyped.email, formDataTyped.password);

      if (res.status === "error") {
        throw new Error(res.message);
      }

      Swal.fire("Success", res.message, "success");

      router.push("/user/");
    } catch (err) {
      Swal.fire("Error", `${err}`, "error");
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
