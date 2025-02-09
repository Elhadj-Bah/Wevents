import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import auth from "../utils/auth";

// const states = [
//   "AL",
//   "AK",
//   "AZ",
//   "AR",
//   "CA",
//   "CO",
//   "CT",
//   "DE",
//   "FL",
//   "GA",
//   "HI",
//   "ID",
//   "IL",
//   "IN",
//   "IA",
//   "KS",
//   "KY",
//   "LA",
//   "ME",
//   "MD",
//   "MA",
//   "MI",
//   "MN",
//   "MS",
//   "MO",
//   "MT",
//   "NE",
//   "NV",
//   "NH",
//   "NJ",
//   "NM",
//   "NY",
//   "NC",
//   "ND",
//   "OH",
//   "OK",
//   "OR",
//   "PA",
//   "RI",
//   "SC",
//   "SD",
//   "TN",
//   "TX",
//   "UT",
//   "VT",
//   "VA",
//   "WA",
//   "WV",
//   "WI",
//   "WY",
// ];

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
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
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-50">
        <h1 className="text-center mb-4">Login</h1>
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
  );
};

export default Login;
