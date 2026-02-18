import React, { useState } from "react";
import login from "../api/auth"
import { getToken, setToken } from "../auth/tokenStorage";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = login(email, password);
    setToken(token);

    navigate("/app", { replace: true });

    console.log("STORED:", getToken());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Entrar</button>
    </form>
  )
}
