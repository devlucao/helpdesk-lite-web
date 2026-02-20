import React, { useState } from "react";
import login from "../api/auth"
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = await login(email, password);
      auth.login(token);

      navigate("/app", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login inválido.")
    }
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
