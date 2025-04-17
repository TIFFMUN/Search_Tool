// import React from "react";
// import "./ResultCard.css";

// const countryMap = {
//   ru: "Russia",
//   fr: "France",
//   uk: "United Kingdom",
//   us: "United States",
//   ua: "Ukraine",
//   de: "Germany",
//   cn: "China",
//   suhh: "Former Soviet Union",
//   // Add more as needed
// };

// function formatDOB(raw) {
//   if (!raw || typeof raw !== "string") return "N/A";

//   // Full date
//   if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

//   // Year and month only
//   if (/^\d{4}-\d{2}$/.test(raw)) {
//     const [year, month] = raw.split("-");
//     return `${year}-${month}-XX`;
//   }

//   // Year only
//   if (/^\d{4}$/.test(raw)) return `${raw}-XX-XX`;

//   return raw;
// }

// function ResultCard({ data }) {
//   const props = data.properties || {};
//   const name = data.caption || props.name?.[0] || "Unknown Name";
//   const dob = formatDOB(props.birthDate?.[0]);
//   const nationalityRaw = props.citizenship || [];
//   const nationality = nationalityRaw.map((c) => countryMap[c] || c).join(", ");
//   const location = props.address?.[0] || null;
//   const id = data.id || "-";
//   const isPerson = data.schema === "Person" || data.schema === "person";

//   return (
//     <div className="result-card">
//       <div className="result-header">
//         <span className="result-icon">{isPerson ? "👤" : "🏢"}</span>
//         <div>
//           <div className="result-name">{name}</div>
//           <div className="result-meta">
//             {id} • {data.schema.charAt(0).toUpperCase() + data.schema.slice(1)}
//           </div>
//         </div>
//       </div>

//       {/* <div className="result-details">
//         {isPerson && (
//           <div>
//             <span className="result-label">DOB:</span> {dob} •{" "}
//             <span className="result-label">Nationality:</span>{" "}
//             {nationality || "N/A"}
//           </div>
//         )}

//         {!isPerson && location && (
//           <div>
//             <span className="result-label">Location:</span> {location}
//           </div>
//         )}
//       </div> */}
//       <div className="result-details">
//         {isPerson && (
//           <>
//             <div className="text-block">
//               <span className="result-label">DOB:</span> {dob}
//             </div>
//             <div className="text-block">
//               <span className="result-label">Nationality:</span>{" "}
//               {nationality || "N/A"}
//             </div>
//           </>
//         )}

//         {!isPerson && location && (
//           <div className="text-block">
//             <span className="result-label">Location:</span> {location}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResultCard;

import React from "react";
import "./ResultCard.css";

const countryCodeToName = {
  ru: "Russia",
  fr: "France",
  uk: "United Kingdom",
  us: "United States",
  ua: "Ukraine",
  de: "Germany",
  cn: "China",
  suhh: "Former Soviet Union",
};

function formatDateOfBirth(rawDate) {
  if (!rawDate || typeof rawDate !== "string") return "N/A";

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) return rawDate;
  if (/^\d{4}-\d{2}$/.test(rawDate)) return `${rawDate}-XX`;
  if (/^\d{4}$/.test(rawDate)) return `${rawDate}-XX-XX`;

  return rawDate;
}

function ResultCard({ record }) {
  const properties = record.properties || {};
  const displayName = record.caption || properties.name?.[0] || "Unknown Name";
  const dateOfBirth = formatDateOfBirth(properties.birthDate?.[0]);
  const citizenshipList = properties.citizenship || [];
  const translatedCountries = citizenshipList
    .map((code) => countryCodeToName[code] || code)
    .join(", ");

  const address = properties.address?.[0] || null;
  const entityId = record.id || "-";
  const isIndividual = record.schema?.toLowerCase() === "person";

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-icon">{isIndividual ? "👤" : "🏢"}</span>
        <div>
          <div className="result-name">{displayName}</div>
          <div className="result-meta">
            {entityId} •{" "}
            {record.schema?.charAt(0).toUpperCase() + record.schema?.slice(1)}
          </div>
        </div>
      </div>

      <div className="result-details">
        {isIndividual && (
          <>
            <div className="text-block">
              <span className="result-label">Date of Birth:</span> {dateOfBirth}
            </div>
            <div className="text-block">
              <span className="result-label">Nationality:</span>{" "}
              {translatedCountries || "N/A"}
            </div>
          </>
        )}

        {!isIndividual && address && (
          <div className="text-block">
            <span className="result-label">Location:</span> {address}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
