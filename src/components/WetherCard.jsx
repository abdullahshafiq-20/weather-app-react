import React, { useEffect, useState } from "react";
import axios from "axios";

import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherWindy } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherNight } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { IoEnter } from "react-icons/io5";

import "./WetherCard.css";

export default function WeatherCard() {
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [days, setDays] = useState(4);

  const getWeatherData = () => {
    axios({
      method: "GET",
      url: `https://api.weatherapi.com/v1/forecast.json?key=863b83758e744d55957134810242202&q='${city}'&days=5`,
    })
      .then((response) => {
        setWeatherData(response.data);
        setWeatherIcon(transformString(response.data.current.condition.text));
        setDays(getNextFourDays(response.data.forecast.forecastday[0].date));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Provide feedback to the user (e.g., set an error state)
      });
    console.log(weatherData);
  };

  function getNextFourDays(startDateStr) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startDate = new Date(startDateStr);
    const result = [];

    // Iterate to get the next four days
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      result.push(daysOfWeek[nextDate.getDay()]);
    }
    console.log(result);

    return result;
  }
  function transformString(inputString) {
    let modifiedString = inputString
      .replace(/ /g, "")
      .replace(/-/g, "")
      .toLowerCase();
    return modifiedString;
  }

  const weatherIcons = {
    cloudy: <TiWeatherCloudy size={50} color="purple" />,
    rain: <TiWeatherDownpour size={50} color="blue" />,
    stormy: <TiWeatherStormy size={50} color="gray" />,
    sunny: <TiWeatherSunny size={50} color="yellow" />,
    windy: <TiWeatherWindy size={50} color="green" />,
    windycloudy: <TiWeatherWindyCloudy size={50} color="lightblue" />,
    lightsnow: <TiWeatherSnow size={50} color="white" />,
    night: <TiWeatherNight size={50} color="black" />,
    clear: <TiWeatherPartlySunny size={50} color="orange" />,
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getWeatherData();
    }
  };

  return (
    <div className="weather-card">
      <div className="card-header">
        <div className="search-container">
          <input
            className="input"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={getWeatherData}>
            <IoEnter size={20} />
          </button>
        </div>
      </div>
      {weatherData && weatherData.current && (
        <div className="card-content">
          <div className="text-center">
            <h1 className="text-xl font-semibold">
              {weatherData.location.name}
            </h1>
            <p className="text-sm text-gray-500">
              {weatherData.location.localtime},{" "}
              {weatherData.current.condition.text}
            </p>
            <div className="main-temp">
              <p className="temperature">{weatherData.current.temp_c}°C</p>
              {weatherIcons[weatherIcon] ? (
                weatherIcon && weatherIcons[weatherIcon]
              ) : (
                <img
                  src={weatherData.current.condition.icon}
                  alt="Weather Icon"
                />
              )}
            </div>
            <div className="weather-info">
              <div className="weather-info-c1">
                <TiWeatherWindy size={100} />
                <span>Wind Speed: {weatherData.current.wind_kph} kph</span>
              </div>
              <div className="weather-info-c1">
                <FaThermometerEmpty size={100} />
                <span>Humidity: {weatherData.current.humidity}%</span>
              </div>
            </div>
            <p className="weather-description">
              {weatherData.current.condition.text}
            </p>
          </div>
          <div className="forecast-list">
            <ul>
              <li className="forecast-item">
                <span>{days[1]}</span>
                <div className="forecast-item-inner">
                  <img
                    src={weatherData.forecast.forecastday[1].day.condition.icon}
                    alt=""
                  />
                  <span className="forecast-temperature">
                    {weatherData.forecast.forecastday[1].day.maxtemp_c}°C /{" "}
                    {weatherData.forecast.forecastday[1].day.mintemp_c}°C
                    ({" "}
                    {
                      weatherData.forecast.forecastday[1].day
                        .daily_chance_of_rain
                    }
                    % <TiWeatherStormy />)
                  </span>
                </div>
              </li>
              <li className="forecast-item">
                <span>{days[2]}</span>
                <div className="forecast-item-inner">
                  <img
                    src={weatherData.forecast.forecastday[2].day.condition.icon}
                    alt=""
                  />
                  <span className="forecast-temperature">
                    {weatherData.forecast.forecastday[2].day.maxtemp_c}°C /{" "}
                    {weatherData.forecast.forecastday[2].day.mintemp_c}°C ({" "}
                    {
                      weatherData.forecast.forecastday[2].day
                        .daily_chance_of_rain
                    }
                    % <TiWeatherStormy />)
                  </span>
                </div>
              </li>
              <li className="forecast-item">
                <span>{days[3]}</span>
                <div className="forecast-item-inner">
                  <img
                    src={weatherData.forecast.forecastday[3].day.condition.icon}
                    alt=""
                  />
                  <span className="forecast-temperature">
                    {weatherData.forecast.forecastday[3].day.maxtemp_c}°C /{" "}
                    {weatherData.forecast.forecastday[3].day.mintemp_c}°C
                    ({" "}
                    {
                      weatherData.forecast.forecastday[3].day
                        .daily_chance_of_rain
                    }
                    % <TiWeatherStormy />)
                  </span>
                </div>
              </li>
              <li className="forecast-item">
                <span>{days[4]}</span>
                <div className="forecast-item-inner">
                  <img
                    src={weatherData.forecast.forecastday[4].day.condition.icon}
                    alt=""
                  />
                  <span className="forecast-temperature">
                    {weatherData.forecast.forecastday[4].day.maxtemp_c}°C /{" "}
                    {weatherData.forecast.forecastday[4].day.mintemp_c}°C
                    ({" "}
                    {
                      weatherData.forecast.forecastday[4].day
                        .daily_chance_of_rain
                    }
                    % <TiWeatherStormy />)
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
