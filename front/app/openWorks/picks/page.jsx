'use client';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPicks } from "@/redux/slices/pickSlice";
import { fetchSurfNames, fetchSurfNameBySurfId, updateSurfNamesMap } from "@/redux/slices/surfNameSlice";

import Link from 'next/link';

const PicksComponent = () => {
  const dispatch = useDispatch();
  const { picks, status: picksStatus, error: picksError } = useSelector((state) => state.picks);
  const { surfNames, surfNamesMap, status: surfNamesStatus, error: surfNamesError } = useSelector((state) => state.surfNames);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPicks());
    dispatch(fetchSurfNames());
  }, [dispatch]);

  useEffect(() => {
    // Convertir el array de surfNames en un mapa por PICK_SURF_ID
    const surfNamesMap = {};
    surfNames.forEach(surfName => {
      surfNamesMap[surfName.PICK_SURF_ID] = surfName.LOCAL_NAME;
    });
    dispatch(updateSurfNamesMap(surfNamesMap)); // Actualizar el mapa en el estado de Redux
  }, [dispatch, surfNames]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPicks = picks.filter(pick =>
    pick.PICK_SURF_ID.toString().includes(searchTerm) ||
    (surfNamesMap[pick.PICK_SURF_ID] && surfNamesMap[pick.PICK_SURF_ID].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (picksStatus === "loading" || surfNamesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (picksStatus === "failed" || surfNamesStatus === "failed") {
    return <div>Error: {picksError || surfNamesError}</div>;
  }

  const renderPickSurfId = (pick) => {
    const localName = surfNamesMap[pick.PICK_SURF_ID];
    return localName ? localName : pick.PICK_SURF_ID;
  };

  return (
    <div className="p-24">
      <h1>All Picks</h1>
      <div className="mb-4">
        <label htmlFor="search">Search by PICK SURF ID or NAME:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
        />
      </div>
      <ul>
        {filteredPicks.map((pick, i) => (
          <li key={i} className="p-4">
            <Link href={`/openWorks/picks/${pick.WELL_ID}`}>
              <div className="text-blue-500">
                {/*<p>WELL_ID: {pick.WELL_ID}</p>*/}
                <p>PICK NAME: {renderPickSurfId(pick)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PicksComponent;
