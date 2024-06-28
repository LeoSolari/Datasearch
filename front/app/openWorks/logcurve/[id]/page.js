'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogCurveById } from "@/redux/slices/logcurveSlice";
import { fetchWellById } from "@/redux/slices/wellSlice";
import logCrvNameIdData from "../../../../public/data/logCrvNameId.json"; // Importar el archivo JSON

const LogCurvePage = ({ params }) => {
  const dispatch = useDispatch();
  const { singleLog, status, error } = useSelector((state) => state.logCurve);
  const { singleWell } = useSelector((state) => state.wells);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchWellById(params.id));
      dispatch(fetchLogCurveById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    // Mostrar el contenido del archivo JSON en la consola
    console.log("Contenido del archivo JSON logCrvNameId.json:", logCrvNameIdData);
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Función para obtener el nombre del LOG_CURVE_NAME_ID
  const getLogCurveName = (logCrvNameId) => {
    const logCurve = logCrvNameIdData.find(item => item.LOG_CURVE_NAME_ID === logCrvNameId);
    return logCurve ? logCurve.Name : logCrvNameId.toString(); // Devuelve el nombre si se encuentra, de lo contrario devuelve el ID como string
  };

  // Ordenar los datos de la curva de registro por LOG_CURVE_ID de menor a mayor
  const sortedLogData = singleLog ? [...singleLog].sort((a, b) => a.LOG_CURVE_ID - b.LOG_CURVE_ID) : [];

  if (status === "loading") {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (!sortedLogData || sortedLogData.length === 0) {
    return <div className="text-center text-gray-600">No log curve found with ID: {params.id}</div>;
  }

  return (
    <div className="p-24">
      <div className="overflow-x-auto">
       <h2 className="text-4xl text-center p-8">{singleWell && singleWell.WELL_NAME_FREE}</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="text-center">
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">LOG CURVE ID</th>
              <th className="py-2 px-4 border-b">WELL ID</th>
              <th className="py-2 px-4 border-b">SERVICE NAME</th>
              <th className="py-2 px-4 border-b">LOG CURVE</th>
              <th className="py-2 px-4 border-b">TOTAL SAMPLES</th>
              <th className="py-2 px-4 border-b">TOP DEPTH</th>
              <th className="py-2 px-4 border-b">BASE DEPTH</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sortedLogData.map((log, index) => (
              <tr key={index} className="bg-white">
                <td className="py-2 px-4 border-b">{log.LOG_CURVE_ID}</td>
                <td className="py-2 px-4 border-b">{log.WELL_ID}</td>
                <td className="py-2 px-4 border-b">{log.SERVICE_NAME}</td>
                <td className="py-2 px-4 border-b">{getLogCurveName(log.LOG_CRV_NAME_ID)}</td>
                <td className="py-2 px-4 border-b">{log.TOTAL_SAMPLES}</td>
                <td className="py-2 px-4 border-b">{log.TOP_DEPTH.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{log.BASE_DEPTH.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogCurvePage;
