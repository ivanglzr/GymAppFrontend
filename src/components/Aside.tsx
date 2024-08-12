"use client";

import "@/css/Aside.css";

import { BackendReponse } from "../index.d";

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
    const res: BackendReponse = await logout();

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
        <Link href="/user">
          <i className="fa-solid fa-house fa-2xl"></i>
        </Link>
        <Link href="/user/training/create">
          <i className="fa-solid fa-clipboard-list fa-2xl"></i>
        </Link>
        <Link href="/user/exercise">
          <i className="fa-solid fa-dumbbell fa-2xl"></i>
        </Link>
        <Link href="/user/settings">
          <i className="fa-solid fa-gear fa-2xl"></i>
        </Link>
        <button className="logout-btn" onClick={logoutUser}>
          <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
        </button>
        <button className="toggle-theme-btn" onClick={changeTheme}>
          <i className={`fa-solid ${toggleThemeIconClass} fa-2xl`}></i>
        </button>
      </nav>
    </aside>
  );
}
