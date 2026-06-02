import { type FormEvent, useState } from "react";
import "./Auth.css";
import Register from "./Register";
import Login from "./Login";

type AuthMode = "login" | "register";

export default function Auth() {
  /**
   *  --------------------- states ---------------------
   */
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
