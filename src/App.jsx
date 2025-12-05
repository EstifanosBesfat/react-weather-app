import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./assets/components/SearchBar";
import WeatherCard from "./assets/components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather("Addis Ababa");
  }, []);

  async function fetchWeather(cityName) {
    const API_KEY = import.meta.env.VITE_API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      //use != 200 to catch any error (404, 401, etc)
      if (data.cod != 200) {
        alert("City not found!");
        return;
      }
      
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather", error);
    }
  }

  if (!weather) return <h1>Loading...</h1>;
  

  return (
    <>
      <h1>My Weather App</h1>
      <SearchBar onSearch={fetchWeather}></SearchBar>
      <WeatherCard weather={weather}></WeatherCard>
    </>
  );
}

export default App;