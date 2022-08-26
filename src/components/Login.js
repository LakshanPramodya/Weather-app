import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "../App.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="card">
      <h2>Weather App</h2>
      <button className="btnLog" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
