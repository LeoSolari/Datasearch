"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Input from "@/components/UI/Input";
import { searchLogCurveByName, clearLogCurveData } from "../../../redux/slices/logcurveSlice";
import * as XLSX from "xlsx";

const Page = () => {
  const dispatch = useDispatch();
  const logCurveData = useSelector((state) => state.logCurve.headerlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogCurve, setSelectedLogCurve] = useState(""); // For storing selected LOG_CRV_NAME
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(clearLogCurveData());
  }, [dispatch]);

  // Extract unique LOG_CRV_NAME values
  const uniqueLogCurveNames = [...new Set(logCurveData.map(log => log.LOG_CRV_NAME))];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() === "" && !selectedLogCurve) {
      setErrorMessage("Debes ingresar algo antes de buscar");
      return;
    }
    setIsLoading(true);
    dispatch(clearLogCurveData());
    dispatch(searchLogCurveByName(searchTerm, selectedLogCurve)).finally(() => {
      setIsLoading(false);
      setSearched(true);
    });
  };

  const handleExportClick = () => {
    // Filter data based on selectedLogCurve
    const filteredData = logCurveData.filter(log => selectedLogCurve === "" || log.LOG_CRV_NAME === selectedLogCurve);

    if (filteredData.length > 0) {
      const dataToExport = filteredData.map(log => ({
        "WELL NAME": log.WELL_NAME_FREE,
        "LOG CURVE NAME": log.LOG_CRV_NAME,
        "TOP DEPTH": log.TOP_DEPTH?.toFixed(2),
        "BASE DEPTH": log.BASE_DEPTH?.toFixed(2),
        "LOG RUN N°": log.LOG_RUN_NO,
        "SERVICE NAME": log.SERVICE_NAME,
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Log Curves");
      const fileName = `${selectedLogCurve || "Log_Curves"}.xlsx`; // Use selectedLogCurve for file name, fallback to "Log_Curves"

      XLSX.writeFile(wb, fileName);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedLogCurve("");
    setErrorMessage("");
    dispatch(clearLogCurveData()); // Clear log curve data to reset state
  };

  useEffect(() => {
    if (!searchTerm && !selectedLogCurve) {
      setSearched(false);
    }
  }, [searchTerm, selectedLogCurve]);

  return (
    <div className="bg-gray-900 h-screen pt-8 text-white">
      <div className="bg-gray-900 text-gray-200 rounded-lg overflow-auto py-20 px-20 border border-gray-700">
        <Input
          id="search-log-curve"
          label="Search Log Curve by Name"
          placeholder="Ingresar curva"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="mt-4">
          <select
            id="log-curve-select"
            value={selectedLogCurve}
            onChange={(e) => setSelectedLogCurve(e.target.value)}
            className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="">-- Seleccionar curva --</option>
            {uniqueLogCurveNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleSearchClick}
          >
            Buscar
          </button>
          <button 
            className={`mt-4 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${logCurveData.length === 0 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500'}`}
            onClick={handleExportClick}
            disabled={logCurveData.length === 0}
          >
            Exportar a Excel
          </button>
          <button 
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
        {isLoading && (
          <p className="text-yellow-500 mt-4">Buscando...</p>
        )}
        {searched && !isLoading && logCurveData.length === 0 && !errorMessage && (
          <p className="text-red-500 mt-4">No se ha encontrado la curva que se buscaba</p>
        )}
        <table className="min-w-full bg-gray-800 border border-gray-700 text-center mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-600">WELL NAME</th>
              <th className="py-2 px-4 border-b border-gray-600">LOG CURVE NAME</th>
              <th className="py-2 px-4 border-b border-gray-600">TOP DEPTH</th>
              <th className="py-2 px-4 border-b border-gray-600">BASE DEPTH</th>
              <th className="py-2 px-4 border-b border-gray-600">LOG RUN N°</th>
              <th className="py-2 px-4 border-b border-gray-600">SERVICE NAME</th>
            </tr>
          </thead>
          <tbody>
            {logCurveData
              .filter((log) => selectedLogCurve === "" || log.LOG_CRV_NAME === selectedLogCurve)
              .map((log) => (
                <tr key={`${log.LOG_CRV_NAME_ID}-${Math.random()}`}>
                  <td className="py-2 px-4 border-b border-gray-600">{log.WELL_NAME_FREE}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{log.LOG_CRV_NAME}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{log.TOP_DEPTH?.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{log.BASE_DEPTH?.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{log.LOG_RUN_NO}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{log.SERVICE_NAME}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
