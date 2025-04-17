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

function ResultCard({ data }) {
  const props = data.properties || {};
  const name = data.caption || props.name?.[0] || "Unknown Name";
  const dob = props.birthDate?.[0] || null;
  const nationality = props.citizenship?.join(", ") || null;
  const location = props.address?.[0] || null;

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold text-gray-800">
        {name} <span className="text-gray-500">• {data.schema}</span>
      </h2>
      <p className="text-sm text-gray-600">ID: {data.id}</p>
      {dob && <p className="text-sm text-gray-600">DOB: {dob}</p>}
      {nationality && (
        <p className="text-sm text-gray-600">Nationality: {nationality}</p>
      )}
      {location && (
        <p className="text-sm text-gray-600">Location: {location}</p>
      )}
    </div>
  );
}

export default ResultCard;
