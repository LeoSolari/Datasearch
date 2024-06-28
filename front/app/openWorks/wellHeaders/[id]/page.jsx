"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWellById } from "@/redux/slices/wellSlice";
import Link from "next/link"; // Importa Link desde next/link
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
    <div className=" mx-auto ">
      
      {singleWell ? (
        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden py-24">
          <div className="p-4">

   
          <div className="p-4">
            <Link href="/openWorks/wellHeaders/">
              <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                Volver a OpenWorks
              </p>
            </Link>
          </div>

            <h2 className="py-8 text-white text-xl font-semibold text-center">
              {singleWell.FIELD}
            </h2>
            <WellDetails singleWell={singleWell} />
          </div>
          <DataView
            UWI={singleWell.CURRENT_WELL_LEASE_NAME}
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

