"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWellById } from "@/redux/slices/wellSlice";
import DataView from "@/components/map/DataView";
import WellDetails from "@/components/wellDetails/WellDetails";

function Page({ params }) {
  const dispatch = useDispatch();
  const { singleWell, status, error } = useSelector((state) => state.wells);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchWellById(params.id));
    }
  }, [dispatch, params.id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 py-20">
      {singleWell ? (
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-16 text-center">
              Details for well {singleWell.WELL_NAME_FREE} (UWI:{" "}
              {singleWell.WELL_UWI})
            </h2>
            <WellDetails singleWell={singleWell} />
          </div>
          <DataView
            UWI={singleWell.WELL_UWI}
            lat={singleWell.WL_SURFACE_LATITUDE}
            long={singleWell.WL_SURFACE_LONGITUDE}
          />
        </div>
      ) : (
        <div>No well found with ID: {params.id}</div>
      )}
    </div>
  );
}

export default Page;
