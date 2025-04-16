import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/search?query=${query}&filter=${filter}`
      );
      setResults(res.data.results);
      setCount(res.data.count);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sanctions Screening App</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter name"
          className="border p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Search
        </button>
      </div>
      <div className="flex gap-4 mt-2">
        {["all", "individual", "entity"].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="filter"
              value={type}
              checked={filter === type}
              onChange={() => setFilter(type)}
            />{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
      <p className="mt-4">Matches Found: {count}</p>
      <div className="mt-4 space-y-4">
        {results.map((item, idx) => (
          <ResultCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
