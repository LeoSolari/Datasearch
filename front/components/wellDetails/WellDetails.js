import React from "react";

const WellDetails = ({ singleWell }) => {
  const wellDetails = [];

  for (const key in singleWell) {
    if (singleWell.hasOwnProperty(key)) {
      wellDetails.push({ label: key, value: singleWell[key] });
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      {wellDetails.map((detail, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-gray-600">{detail.label.toUpperCase()}</span>
          <span className="font-semibold">
            {detail.value ? detail.value : "No data yet."}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WellDetails;
