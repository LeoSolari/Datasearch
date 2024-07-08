'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPicks } from "@/redux/slices/pickSlice";
import Link from 'next/link';

const PicksComponent = () => {
  const dispatch = useDispatch();
  const { picks, status, error } = useSelector((state) => state.picks);

  useEffect(() => {
    dispatch(fetchPicks());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-24">
      <h1>All Picks</h1>
      <ul>
        {picks.map((pick, i) => (
          <li key={i} className="p-4">
            <Link href={`/openWorks/picks/${pick.WELL_ID}`}>
              <div className="text-blue-500">
                <p>WELL_ID: {pick.WELL_ID}</p>
                <p>Name: {pick.PICK_SURF_ID}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PicksComponent;
