import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    async function fetchWeather() {
      const CITY_NAME = "Addis ababa";
      const API_KEY = import.meta.env.VITE_API_KEY; // access the key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather", error);
      }
    }
    fetchWeather();
  }, []);

  // if we have no data yet
  if (!weather) return <h1>Loading...</h1>;

  return (
    <>
      <h2>the city name {weather.name}</h2>
      <p>Temperatur: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </>
  );
}

export default App;
