import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import "./App.css";
import jsonData from "./cities.json";
import LoginButton from "./components/Login";
import Weather from "./components/Weather";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  const [cities, setCities] = useState([]);

  const getCities = function () {
    setCities(jsonData.List);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      {!isLoading && isAuthenticated && <Weather cities={cities} />}
      {!isLoading && !isAuthenticated && <LoginButton />}
    </div>
  );
};

export default App;
