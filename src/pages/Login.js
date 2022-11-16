import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input/Input";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    console.log("loginData", data);
    props.history.push("/dashboard");
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <h1 className="header-nav lg">Identify</h1>
        <div className="form-wrapper">
          <h3 className="header-nav">Login</h3>
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="btn-wrapper">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
