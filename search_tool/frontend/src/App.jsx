import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
      );
      setResults(res.data.results);
      setCount(res.data.count);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="container">
      <div className="search-panel">
        <h1 className="title">OFAC Sanctions Search Tool</h1>
        <p className="subtitle">
          Search the Office of Foreign Assets Control (OFAC) sanctions lists
        </p>

        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <div className="filters">
          {["all", "individual", "entity"].map((type) => (
            <label key={type} className="filter-label">
              <input
                type="radio"
                name="filter"
                value={type}
                checked={filter === type}
                onChange={() => setFilter(type)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="results-panel">
        <div className="results-header">
          <h2>Search Results</h2>
          <span>{count} matches found</span>
        </div>
        <div className="result-list">
          {results.map((item, idx) => (
            <ResultCard key={idx} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
