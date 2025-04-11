import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import auth from "../utils/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    const user = { username, password };

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to login.");
      }

      const data = await response.json();
      if (data.token) {
        auth.login(data.token);
      } else {
        console.log("No token received");
      }
      console.log("User Logged successfully");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login");
    }
  };

  return (
    // THIS IS THE OLD WAY
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-60">
        <h1 className="mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>

    // // THIS IS THE NEW WAY
    // <div className="frosted-glass w-100">
    //   <h1 className="d-flex">Login</h1>
    //   {error && <div className="alert alert-danger">{error}</div>}
    //   <div className="d-flex flex-column gap-1 py-2">
    //     <input
    //       type="text"
    //       className="form-control"
    //       value={username}
    //       placeholder="Username"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       className="form-control"
    //       value={password}
    //       placeholder="Password"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div className="d-flex align-items-end flex-column p-2">
    //     <Button>Login</Button>
    //   </div>
    // </div>
  );
};

export default Login;
