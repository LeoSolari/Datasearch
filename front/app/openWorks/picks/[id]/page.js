'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPickById } from '@/redux/slices/pickSlice';
import { fetchSurfNameBySurfId } from '@/redux/slices/surfNameSlice';
import { fetchWellById } from '@/redux/slices/wellSlice';

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singlePick, status, error } = useSelector((state) => state.picks);
  const { surfNamesMap } = useSelector((state) => state.surfNames);
  const { singleWell } = useSelector((state) => state.wells);
  

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPickById(params.id));
      dispatch(fetchWellById(params.id));
    }
  }, [dispatch, params.id]);

  console.log(singleWell)


  if (status === "loading" || !singlePick) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-24 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Pick Details</h1>
      {singlePick.map((pick, index) => (
        <div className="bg-white p-6 mb-6 rounded-lg shadow-md" key={index}>
          <p className="text-lg font-semibold">WELL NAME: {singleWell?.WELL_NAME_FREE}</p>
          <p className="text-lg">Nombre del pick: <span className="font-semibold">{surfNamesMap[pick.PICK_SURF_ID] || pick.PICK_SURF_ID}</span></p>
          <p className="text-lg">Profundidad: {pick.PICK_DEPTH.toFixed(2)}</p>
          <p className="text-lg">Data source: {pick.ORIGINAL_DATA_SOURCE}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
