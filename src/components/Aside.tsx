"use client";

import "@/css/Aside.css";

import { BackendResponse } from "../index.d";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "@/services/user";

export default function Aside() {
  const router = useRouter();

  const [toggleThemeIconClass, setToggleThemeIconClass] =
    useState<string>("fa-moon");

  const changeTheme = () => {
    document.body.classList.toggle("light");

    if (toggleThemeIconClass === "fa-sun") {
      setToggleThemeIconClass("fa-moon");
    } else {
      setToggleThemeIconClass("fa-sun");
    }
  };

  const logoutUser = async () => {
    const res: BackendResponse = await logout();

    if (res.status === "error") {
      alert(res.message);
      return;
    }

    alert(res.message);

    router.push("/login");
  };

  return (
    <aside id="navigation-aside">
      <nav className="aside-nav">
        <Link href="/user" aria-label="Navigate to user's page">
          <i className="fa-solid fa-house fa-2xl"></i>
        </Link>
        <Link
          href="/user/training/create"
          aria-label="Navigate to create training page"
        >
          <i className="fa-solid fa-clipboard-list fa-2xl"></i>
        </Link>
        <Link
          href="/user/exercise"
          aria-label="Navigate to user's exercises page"
        >
          <i className="fa-solid fa-dumbbell fa-2xl"></i>
        </Link>
        <Link
          href="/user/settings"
          aria-label="Navigate to user's settings page"
        >
          <i className="fa-solid fa-gear fa-2xl"></i>
        </Link>
        <button
          className="logout-btn"
          onClick={logoutUser}
          aria-label="Logout user and redirect to login"
        >
          <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
        </button>
        <button
          className="toggle-theme-btn"
          onClick={changeTheme}
          aria-label="Toggle page's color theme from dark to light or light to dark"
        >
          <i className={`fa-solid ${toggleThemeIconClass} fa-2xl`}></i>
        </button>
      </nav>
    </aside>
  );
}
