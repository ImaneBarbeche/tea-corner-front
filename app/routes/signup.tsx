import { useState } from "react";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // prevents reloading
    e.preventDefault();

    // convert front variables to match the back variables when creating it
    const data = {
      user_name: username,
      display_name: displayName,
      email: email,
      password: password,
    };

    // sending everything to be backend
    try {
      const response = await authService.signup(data);
      console.log(response.data);

      // after succeding, directly navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit}>
        <label>Nom d'affichage</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
