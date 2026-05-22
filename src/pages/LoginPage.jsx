import { useState } from "react";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return;

    onLogin(name);
  };

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