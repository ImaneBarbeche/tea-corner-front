import { useState } from "react";
import type { SignInDto } from "../dto/auth.dto";

// Fonction pour récupérer le token CSRF
function getCsrfToken(): string {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrf-token") {
            console.log('Token CSRF trouvé :', decodeURIComponent(value)); // Log pour déboguer

      return decodeURIComponent(value);
    }
  }
  console.error("Token CSRF non trouvé.");
  return "";
}
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: SignInDto = {
      user_name: username,
      password,
    };
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        setError("Token CSRF manquant. Veuillez recharger la page.");
        return;
      }
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
        throw new Error(errorData.message || "Erreur lors de la connexion.");
      }

      const responseData = await response.json();
      console.log("Connexion réussie:", responseData);
      // add redirection or save user state here
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue.",
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
        <button type="submit"> Se connecter</button>
      </form>
    </div>
  );
}
