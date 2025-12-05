function WeatherCard({weather}) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <p className="temp">{weather.main.temp}°C</p>
        <p className="desc">{weather.weather[0].description}</p>
      </div>
    </>
  );
}

export default WeatherCard;