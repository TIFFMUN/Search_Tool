// // import React, { useState } from "react";
// // import axios from "axios";
// // import ResultCard from "./ResultCard";
// // import "./App.css";

// // function App() {
// //   const [query, setQuery] = useState("");
// //   const [filter, setFilter] = useState("all");
// //   const [results, setResults] = useState([]);
// //   const [count, setCount] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const RESULTS_PER_PAGE = 5;

// //   const paginatedResults = results.slice(
// //     (currentPage - 1) * RESULTS_PER_PAGE,
// //     currentPage * RESULTS_PER_PAGE
// //   );

// //   const handleSearch = async () => {
// //     try {
// //       const res = await axios.get(
// //         `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
// //       );
// //       setResults(res.data.results);
// //       setCount(res.data.count);
// //       setCurrentPage(1);
// //     } catch (err) {
// //       console.error("Search failed:", err);
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <div className="search-panel">
// //         <h1 className="title">OFAC Sanctions Search Tool</h1>
// //         <p className="subtitle">
// //           Search the Office of Foreign Assets Control (OFAC) sanctions lists
// //         </p>

// //         <div className="search-box">
// //           <input
// //             type="text"
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //             placeholder="Search name"
// //             className="search-input"
// //           />
// //           <button onClick={handleSearch} className="search-button">
// //             Search
// //           </button>
// //         </div>

// //         <div className="filters">
// //           {["all", "individual", "entity"].map((type) => (
// //             <label key={type} className="filter-label">
// //               <input
// //                 type="radio"
// //                 name="filter"
// //                 value={type}
// //                 checked={filter === type}
// //                 onChange={() => setFilter(type)}
// //               />
// //               {type.charAt(0).toUpperCase() + type.slice(1)}
// //             </label>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="results-panel">
// //         <div className="results-header">
// //           <h2>Search Results</h2>
// //           <span>{count} matches found</span>
// //         </div>
// //         <div className="result-list">
// //           {paginatedResults.map((item, idx) => (
// //             <ResultCard key={idx} data={item} />
// //           ))}
// //         </div>

// //         <div className="pagination">
// //           <div className="page-info">
// //             Page {currentPage} of {Math.ceil(results.length / RESULTS_PER_PAGE)}
// //           </div>
// //           {Array.from({
// //             length: Math.ceil(results.length / RESULTS_PER_PAGE),
// //           }).map((_, idx) => (
// //             <button
// //               key={idx}
// //               className={`page-button ${
// //                 currentPage === idx + 1 ? "active" : ""
// //               }`}
// //               onClick={() => setCurrentPage(idx + 1)}
// //             >
// //               {idx + 1}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import ResultCard from "./ResultCard";
// import "./App.css";

// function App() {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [results, setResults] = useState([]);
//   const [count, setCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [submitted, setSubmitted] = useState(false);
//   const resultsPerPage = 5;

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(
//         `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
//       );
//       setResults(res.data.results);
//       setCount(res.data.count);
//       setCurrentPage(1);
//       setSubmitted(true);
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   const paginatedResults = results.slice(
//     (currentPage - 1) * resultsPerPage,
//     currentPage * resultsPerPage
//   );

//   const totalPages = Math.ceil(results.length / resultsPerPage);

//   return (
//     <div className="container">
//       <div className="search-panel">
//         <h1 className="title">OFAC Sanctions Search Tool</h1>
//         <p className="subtitle">
//           Search the Office of Foreign Assets Control (OFAC) sanctions lists
//         </p>
//         <div className="search-box">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search name"
//             className="search-input"
//           />
//           <button onClick={handleSearch} className="search-button">
//             Search
//           </button>
//         </div>
//         <div className="filters">
//           {[
//             { label: "All", value: "all" },
//             { label: "Individual", value: "individual" },
//             { label: "Entity", value: "entity" },
//           ].map(({ label, value }) => (
//             <label key={value} className="filter-label">
//               <input
//                 type="radio"
//                 name="filter"
//                 value={value}
//                 checked={filter === value}
//                 onChange={() => setFilter(value)}
//               />
//               {label}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className={`results-panel ${!submitted ? "hidden" : ""}`}>
//         <div className="results-header">
//           <span>Search Results</span>
//           <span>{count} matches found</span>
//         </div>
//         <div className="result-list">
//           {paginatedResults.map((item, idx) => (
//             <ResultCard key={idx} data={item} />
//           ))}
//         </div>
//         {count > resultsPerPage && (
//           <div className="pagination">
//             <span className="pagination-info">
//               Page {currentPage} of {totalPages}
//             </span>
//             <div className="pagination-buttons">
//               {[...Array(totalPages).keys()].map((i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={
//                     currentPage === i + 1 ? "active-page-button" : "page-button"
//                   }
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const resultsPerPage = 5;

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
      );
      setResults(res.data.results);
      setCount(res.data.count);
      setCurrentPage(1);
      setSubmitted(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const totalPages = Math.ceil(results.length / resultsPerPage);

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
          {[
            { label: "All", value: "all" },
            { label: "Individual", value: "individual" },
            { label: "Entity", value: "entity" },
          ].map(({ label, value }) => (
            <label key={value} className="filter-label">
              <input
                type="radio"
                name="filter"
                value={value}
                checked={filter === value}
                onChange={() => setFilter(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={`results-panel ${!submitted ? "hidden" : ""}`}>
        <div className="results-header">
          <span>Search Results</span>
          <span>{count} matches found</span>
        </div>
        <div className="result-list">
          {paginatedResults.map((item, idx) => (
            <ResultCard key={idx} data={item} />
          ))}
        </div>
        {count > resultsPerPage && (
          <div className="pagination">
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <div className="pagination-buttons">
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
