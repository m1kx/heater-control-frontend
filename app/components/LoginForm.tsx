"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(`/api/auth`, {
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
      method: "post",
    });

    if (request.status !== 200) {
      return setPasswordIncorrect(true), setLoading(false);
    }
    router.push("/");
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <label htmlFor="">Password:</label>
        <input
          type="password"
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordIncorrect && <p>Password incorrect</p>}
        <button disabled={loading} type="submit">
          {loading ? "loading..." : "submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
