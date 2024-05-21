import React from "react";

const LogCurveDetails = ({ singleLog }) => {
  // Verificar si singleLog es un array y tiene al menos un elemento
  if (!Array.isArray(singleLog) || singleLog.length === 0) {
    return <div>No data available</div>;
  }

  // Obtener el primer objeto del array (asumiendo que solo hay uno)
  const logData = singleLog[0];

  const logDetails = [];

  // Iterar sobre las propiedades del objeto
  for (const key in logData) {
    if (logData.hasOwnProperty(key)) {
      logDetails.push({ label: key, value: logData[key] });
    }
  }

  return (
    <div className="mx-auto bg-gray-900 rounded-lg shadow-md overflow-hidden p-4">
      <h2 className="text-xl font-semibold mb-16 text-center">
        Log Curve Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        {logDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-gray-400">{detail.label.toUpperCase()}</span>
            <span className="font-semibold text-gray-200">
              {detail.value ? detail.value : "No data yet."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogCurveDetails;
