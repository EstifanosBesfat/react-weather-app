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
  
  // Construct URL for the icon 
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h1>My Weather App</h1>
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

      <div className="weather-card">
        <h2>{weather.name}</h2>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <p className="temp">{weather.main.temp}°C</p>
        <p className="desc">{weather.weather[0].description}</p>
      </div>
    </>
  );
}

export default App;