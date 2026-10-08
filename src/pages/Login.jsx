import React, { useState } from "react";

export default function Login({ users }) {
  const [loginForm, setLoginForm] = useState({ name: "", id: "" });
  const [loginMessage, setLoginMessage] = useState({ text: "", isError: false });

  const handleLogin = (e) => {
    e.preventDefault();
    const name = loginForm.name.trim();
    const id = loginForm.id.trim();

    const foundUser = users.find(
      (u) => u.name === name && u.membershipID === id
    );

    if (foundUser) {
      setLoginMessage({
        text: `Login successful. Welcome ${name}!`,
        isError: false,
      });
    } else {
      setLoginMessage({
        text: "User not found. Please check your details.",
        isError: true,
      });
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form-group">
        <input
          type="text"
          placeholder="User Name"
          value={loginForm.name}
          onChange={(e) =>
            setLoginForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Membership ID"
          value={loginForm.id}
          onChange={(e) =>
            setLoginForm((prev) => ({ ...prev, id: e.target.value }))
          }
        />
        <button type="submit">Login</button>
      </form>
      {loginMessage.text && (
        <p style={{ color: loginMessage.isError ? "red" : "green" }}>
          {loginMessage.text}
        </p>
      )}
    </div>
  );
}