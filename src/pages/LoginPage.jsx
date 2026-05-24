// Imports
import { useState } from "react";

// Components
function LoginPage({ onLogin }) {

  // Stores the user name (locally only)
  const [name, setName] = useState("");

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Stops empty input
    if (name.trim() === "") return;

    onLogin(name);
  };

  // JSX UI
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <p>Enter your name to continue.</p>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="privacy-note">
          This name is used only as a local display name and is stored in your browser.
          No personal or sensitive data is collected.
        </p>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default LoginPage;
