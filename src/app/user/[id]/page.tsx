"use client";

import { getUserByToken } from "@/services/user";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserByToken()
      .then((res) => {
        setUser(res.user);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return <h1>Hola</h1>;
}
