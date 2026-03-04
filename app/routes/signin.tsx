import { useState, useEffect } from "react";
import type { SignInDto } from "../dto/auth.dto";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/auth/csrf-token", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.csrfToken); 
      })
      .catch((err) => console.error("CSRF Error :", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!csrfToken) {
      setError("Csrf Token missing. Reload the page");
      return;
    }

    const data: SignInDto = {
      user_name: username,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, 
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Connection error.");
      }

      const responseData = await response.json();
      console.log("Connected:", responseData);
    } catch (error) {
      console.error("Connection error:", error);
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nom d'utilisateur:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
