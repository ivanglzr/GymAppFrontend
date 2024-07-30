"use client";

import React from "react";

import Swal from "sweetalert2";

import "@/css/Forms.css";

import { validateSignInForm } from "@/utils/validateForm";

import { SignInInterface, User } from "../index";

import { postUser } from "@/services/user";

export default function SignIn() {
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

    try {
      validateSignInForm(formDataTyped);

      const user: User = {
        ...formDataTyped,
        trainings: [],
      };

      const res = await postUser(user);

      if (res.status === "error") {
        throw new Error(res.message);
      }

      Swal.fire("Success", "You signed in correctly", "success");
    } catch (err) {
      Swal.fire("Error", err as string, "error");
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="numeric-data">
        <div className="numeric-data-group">
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" />
        </div>
        <div className="numeric-data-group">
          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" id="weight" />
        </div>
        <div className="numeric-data-group">
          <label htmlFor="height">Height</label>
          <input type="number" name="height" id="height" />
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
