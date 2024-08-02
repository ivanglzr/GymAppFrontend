"use client";

import React from "react";

import Swal from "sweetalert2";

import "@/css/Forms.css";

import { useRouter } from "next/navigation";

import { LogInInterface } from "..";

import { validateLogInForm } from "@/utils/validateForm";

import { login } from "@/services/user";

export default function LogIn() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const formDataTyped: LogInInterface = {
      email: data.email as string,
      password: data.password as string,
    };

    try {
      validateLogInForm(formDataTyped);

      const res = await login(formDataTyped.email, formDataTyped.password);

      if (res.status === "error") {
        return Swal.fire("Error", `${res.message}`, "error");
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
        <input type="email" name="email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit" id="btn-submit">
        Submit
      </button>
    </form>
  );
}
