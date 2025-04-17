// import React, { useState } from "react";
// import axios from "axios";
// import ResultCard from "./ResultCard";

// function App() {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [results, setResults] = useState([]);
//   const [count, setCount] = useState(0);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(
//         `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
//       );

//       setResults(res.data.results);
//       setCount(res.data.count);
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Sanctions Screening App</h1>
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter name"
//           className="border p-2 flex-1"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2"
//         >
//           Search
//         </button>
//       </div>
//       <div className="flex gap-4 mt-2">
//         {["all", "individual", "entity"].map((type) => (
//           <label key={type}>
//             <input
//               type="radio"
//               name="filter"
//               value={type}
//               checked={filter === type}
//               onChange={() => setFilter(type)}
//             />{" "}
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </label>
//         ))}
//       </div>
//       <p className="mt-4">Matches Found: {count}</p>
//       <div className="mt-4 space-y-4">
//         {results.map((item, idx) => (
//           <ResultCard key={idx} data={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

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
        `https://search-tool-backend.onrender.com/search?query=${query}&filter=${filter}`
      );

      setResults(res.data.results);
      setCount(res.data.count);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        OFAC Sanctions Search Tool
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        Search the Office of Foreign Assets Control (OFAC) sanctions lists
      </p>

      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter name..."
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        <div className="flex gap-4 text-sm">
          {["all", "individual", "entity"].map((type) => (
            <label key={type} className="flex items-center gap-1">
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

      <p className="mb-2 text-sm text-gray-500">{count} matches found</p>

      <div className="space-y-4">
        {results.map((item, idx) => (
          <ResultCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
