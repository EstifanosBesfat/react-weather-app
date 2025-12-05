import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [cityInput, setCityInput] = useState(""); 

  useEffect(() => {
    fetchWeather("Addis Ababa");
  }, []);

  async function fetchWeather(cityName) {
    const API_KEY = import.meta.env.VITE_API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      // OPTIONAL: Check if city exists (API returns 404 if not found)
      if (data.cod === "404") {
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
      <label htmlFor="city-name">City: </label>
      <input
        type="text"
        id="city-name"
        placeholder="enter city name"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)} 
      />
      <button style={{marginLeft: "10px"}} onClick={() => fetchWeather(cityInput)}>
        Search
      </button>

      <div>
        <h2>City: {weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    </>
  );
}

export default App;