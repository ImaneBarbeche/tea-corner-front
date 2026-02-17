import { useState } from "react";
import { useNavigate } from "react-router";
import type { SignUpDto } from "../dto/auth.dto";

export default function SignUp() {
  const [username, setUser_name] = useState("");
  const [displayName, setDisplay_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // prevents reloading
    e.preventDefault();
    const data: SignUpDto = {
      display_name: displayName,
      user_name: username,
      email,
      password,
    };
    // sending everything to be backend
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Pour envoyer les cookies si nécessaire
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription.");
      }

      const responseData = await response.json();
      console.log("Inscription réussie:", responseData);
      

      setSuccess(
        "Inscription réussie ! Un email de vérification vous a été envoyé. " +
        "Veuillez vérifier votre boîte mail pour activer votre compte."
      );
      setError(null);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue.",
      );
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nom d'affichage</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplay_Name(e.target.value)}
        />
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUser_name(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
