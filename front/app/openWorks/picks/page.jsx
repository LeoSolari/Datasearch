'use client';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPicks } from "@/redux/slices/pickSlice";
import Link from 'next/link';

const PicksComponent = () => {
  const dispatch = useDispatch();
  const { picks, status, error } = useSelector((state) => state.picks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPicks());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPicks = picks.filter(pick =>
    pick.PICK_SURF_ID.toString().includes(searchTerm)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-24">
      <h1>All Picks</h1>
      <div className="mb-4">
        <label htmlFor="search">Search by PICK SURF ID:</label>
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
                <p>WELL_ID: {pick.WELL_ID}</p>
                <p>PICK SURF ID: {pick.PICK_SURF_ID}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PicksComponent;
