// import React from "react";

// function ResultCard({ data }) {
//   const props = data.properties || {};
//   return (
//     <div className="border p-4 rounded shadow">
//       <h2 className="text-xl font-semibold">
//         {data.caption || props.name?.[0] || "Unknown Name"}
//       </h2>
//       <p>Type: {data.schema}</p>
//       <p>ID: {data.id}</p>
//       <p>Date of Birth: {props.birthDate?.[0] || "N/A"}</p>
//       <p>Nationality: {props.citizenship?.join(", ") || "N/A"}</p>
//       <p>Topics: {props.topics?.join(", ") || "N/A"}</p>
//       <p>From Datasets: {data.datasets?.join(", ") || "N/A"}</p>
//     </div>
//   );
// }

// export default ResultCard;

import React from "react";
import "./ResultCard.css";

function ResultCard({ data }) {
  const props = data.properties || {};
  const name = data.caption || props.name?.[0] || "Unknown Name";
  const dob = props.birthDate?.[0] || "N/A";
  const nationality = props.citizenship?.join(", ") || "N/A";
  const location = props.address?.[0] || null;
  const id = data.id || "-";

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-icon">
          {data.schema === "Person" ? "👤" : "🏢"}
        </span>
        <div>
          <div className="result-name">{name}</div>
          <div className="result-meta">
            {id} • {data.schema.charAt(0).toUpperCase() + data.schema.slice(1)}
          </div>
        </div>
      </div>

      <div className="result-details">
        {data.schema === "Person" && (
          <div>
            <span className="result-label">DOB:</span> {dob} &nbsp;•&nbsp;
            <span className="result-label">Nationality:</span> {nationality}
          </div>
        )}

        {data.schema !== "Person" && location && (
          <div>
            <span className="result-label">Location:</span> {location}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
