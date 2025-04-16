import React from "react";

function ResultCard({ data }) {
  const props = data.properties || {};
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">
        {data.caption || props.name?.[0] || "Unknown Name"}
      </h2>
      <p>Type: {data.schema}</p>
      <p>ID: {data.id}</p>
      <p>Date of Birth: {props.birthDate?.[0] || "N/A"}</p>
      <p>Nationality: {props.citizenship?.join(", ") || "N/A"}</p>
      <p>Topics: {props.topics?.join(", ") || "N/A"}</p>
      <p>From Datasets: {data.datasets?.join(", ") || "N/A"}</p>
    </div>
  );
}

export default ResultCard;
