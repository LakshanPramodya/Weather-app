import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useQuery } from "react-query";

const API_KEY = "484ba5d4f5ed108eacddb13d904b5e33";
const API_URL = "https://api.openweathermap.org/";

const getWeather = async function (cityCode = "1248991") {
  const response = await fetch(
    `${API_URL}data/2.5/weather?id=${cityCode}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

const Weather = (props) => {
  const { cities } = props;

  const { logout } = useAuth0();
  const [cityCode, setCityCode] = useState("1248991");
  const [input, setInput] = useState("Colombo");
  const { data } = useQuery(["weather", cityCode], () => getWeather(cityCode), {
    staleTime: 300000,
    cacheTime: 300000,
  });

  const searchBtnOnClick = function () {
    const city = cities.find((city) => city.CityName === input);
    setCityCode(city.CityCode);
  };

  return (
    <div className="card">
      <div className="search">
        <select
          className="dropDownMenu"
          onChange={(event) => {
            setInput(event.target.value);
          }}
        >
          {cities.map((city) => (
            <option
              className="option"
              key={city.CityCode}
              value={city.CityName}
            >
              {city.CityName}
            </option>
          ))}
        </select>
        <button
          className="btnSearch"
          onClick={(e) => {
            e.preventDefault();
            searchBtnOnClick();
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
      </div>
      {data && (
        <div className="weather">
          <h2 className="city">Weather in {data.name}</h2>
          <h1 className="temp">{data.main.temp} °C</h1>
          <div className="description">{data.weather[0].description}</div>
        </div>
      )}
      <div className="logOut">
        <button
          className="btnLog"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Weather;
