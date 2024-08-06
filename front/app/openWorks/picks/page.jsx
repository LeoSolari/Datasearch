'use client';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPicks } from "@/redux/slices/pickSlice";
import { fetchSurfNames, updateSurfNamesMap } from "@/redux/slices/surfNameSlice";
import * as XLSX from 'xlsx';

const PicksComponent = () => {
  const dispatch = useDispatch();
  const { picks, status: picksStatus, error: picksError } = useSelector((state) => state.picks);
  const { surfNames, surfNamesMap, status: surfNamesStatus, error: surfNamesError } = useSelector((state) => state.surfNames);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPickSurfName, setSelectedPickSurfName] = useState('');

  useEffect(() => {
    dispatch(fetchPicks());
    dispatch(fetchSurfNames());
  }, [dispatch]);

  useEffect(() => {
    const surfNamesMap = {};
    surfNames.forEach(surfName => {
      surfNamesMap[surfName.PICK_SURF_ID] = surfName.LOCAL_NAME;
    });
    dispatch(updateSurfNamesMap(surfNamesMap));
  }, [dispatch, surfNames]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePickSurfNameChange = (event) => {
    setSelectedPickSurfName(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedPickSurfName('');
  };

  const handleExportToExcel = () => {
    const picksToExport = filteredPicks.filter(pick => 
      selectedPickSurfName === '' || pick.PICK_SURF_NAME === selectedPickSurfName
    ).map(pick => ({
      "WELL UWI": pick.WELL_UWI,
      "WELL NAME": pick.WELL_NAME_FREE,
      "PICK NAME": pick.PICK_SURF_NAME,
      "PICK DEPTH": pick.PICK_DEPTH?.toFixed(2),
      "INTERPRETE": pick.ORIGINAL_DATA_SOURCE,
      "PICK OBS": pick.PICK_OBS_NO,
      "PICK CONFIDENCE": pick.PICK_CONF_FACT !== null ? "GOOD" : "-"
    }));

    const worksheet = XLSX.utils.json_to_sheet(picksToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Picks');
    const fileName = selectedPickSurfName ? `picks_${selectedPickSurfName}.xlsx` : 'picks.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  const filteredPicks = picks.filter(pick =>
    (pick.PICK_SURF_ID.toString().includes(searchTerm) ||
    (surfNamesMap[pick.PICK_SURF_ID] && surfNamesMap[pick.PICK_SURF_ID].toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedPickSurfName === '' || pick.PICK_SURF_NAME === selectedPickSurfName)
  );

  const filteredPickSurfNames = [...new Set(
    picks
      .filter(pick =>
        pick.PICK_SURF_ID.toString().includes(searchTerm) ||
        (surfNamesMap[pick.PICK_SURF_ID] && surfNamesMap[pick.PICK_SURF_ID].toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .map(pick => pick.PICK_SURF_NAME)
  )];

  if (picksStatus === "loading" || surfNamesStatus === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (picksStatus === "failed" || surfNamesStatus === "failed") {
    return <div className="text-center text-red-500">Error: {picksError || surfNamesError}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">All Picks</h1>
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="search" className="sr-only">Buscar por nombre o ID:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by PICK SURF ID or NAME..."
          />
          <label htmlFor="pickSurfName" className="sr-only">Filter by PICK SURF NAME:</label>
          <select
            id="pickSurfName"
            value={selectedPickSurfName}
            onChange={handlePickSurfNameChange}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Mostrar picks</option>
            {filteredPickSurfNames.map((name, i) => (
              <option key={i} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Limpiar filtros
          </button>
          <button
            onClick={handleExportToExcel}
            disabled={selectedPickSurfName === ''}
            className={`mt-4 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              selectedPickSurfName === ''
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500'
            }`}
          >
            Exportar a Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-4 border-b">WELL UWI</th>
                <th className="py-2 px-4 border-b">WELL NAME</th>
                <th className="py-2 px-4 border-b">PICK NAME</th>
                <th className="py-2 px-4 border-b">PICK DEPTH</th>
                <th className="py-2 px-4 border-b">INTERPRETE</th>
                <th className="py-2 px-4 border-b">PICK OBS</th>
                <th className="py-2 px-4 border-b">PICK CONFIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {filteredPicks.map((pick, i) => (
                <tr key={i} className="hover:bg-gray-100 transition-colors text-center">
                  <td className="py-2 px-4 border-b">{pick.WELL_UWI}</td>
                  <td className="py-2 px-4 border-b">{pick.WELL_NAME_FREE}</td>
                  <td className="py-2 px-4 border-b">{pick.PICK_SURF_NAME}</td>
                  <td className="py-2 px-4 border-b">{pick.PICK_DEPTH?.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{pick.ORIGINAL_DATA_SOURCE}</td>
                  <td className="py-2 px-4 border-b">{pick.PICK_OBS_NO}</td>
                  <td className="py-2 px-4 border-b">{pick.PICK_CONF_FACT !== null ? "GOOD" : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PicksComponent;
