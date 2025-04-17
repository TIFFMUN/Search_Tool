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
