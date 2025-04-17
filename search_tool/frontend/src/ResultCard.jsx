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
