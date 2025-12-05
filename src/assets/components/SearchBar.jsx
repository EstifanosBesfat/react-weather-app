import { useState } from "react";

function SearchBar({ onSearch }) {
  const [cityInput, setCityInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (cityInput.trim() === "") return;
    onSearch(cityInput);
    setCityInput("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city-name">City: </label>
        <input
          type="text"
          id="city-name"
          placeholder="enter city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button
          style={{ marginLeft: "10px" }}
          type="submit"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar;