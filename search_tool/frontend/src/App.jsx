import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsPerPage = 5;

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `https://search-tool-backend.onrender.com/search?query=${searchTerm}&filter=${categoryFilter}`
      );
      setSearchResults(response.data.results);
      setMatchCount(response.data.count);
      setCurrentPage(1);
      setHasSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const currentPageResults = searchResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  return (
    <div className="app-container">
      <div className="search-section">
        <h1 className="main-heading">OFAC Sanctions Search Tool</h1>
        <p className="subheading">
          Search the Office of Foreign Assets Control (OFAC) sanctions lists
        </p>

        <div className="input-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <span className="filter-heading">Search in:</span>
          {[
            { label: "All", value: "all" },
            { label: "Individuals", value: "individual" },
            { label: "Entities", value: "entity" },
          ].map(({ label, value }) => (
            <label key={value} className="filter-option">
              <input
                type="radio"
                name="categoryFilter"
                value={value}
                checked={categoryFilter === value}
                onChange={() => setCategoryFilter(value)}
              />
              {label}
            </label>
          ))}
          <div className="search-button-container">
            <button
              onClick={handleSearchClick}
              className="search-button"
              aria-label="Search sanctions list"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className={`results-section ${!hasSearched ? "hidden" : ""}`}>
        <div className="results-header">
          <span>Search Results</span>
          <span>{matchCount} matches found</span>
        </div>
        <div className="result-cards">
          {currentPageResults.map((item, idx) => (
            <ResultCard key={idx} data={item} />
          ))}
        </div>

        {matchCount > resultsPerPage && (
          <div className="pagination">
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <div className="page-buttons">
              {[...Array(totalPages).keys()].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1 ? "page-button active" : "page-button"
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
