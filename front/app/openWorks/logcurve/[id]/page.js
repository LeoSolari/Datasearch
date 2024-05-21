"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogCurveById } from "@/redux/slices/logcurveSlice";
import DataView from "@/components/map/DataView";
import LogCurveDetails from "@/components/wellDetails/logCurveDetails";

const LogCurvePage = ({ params }) => {
  const dispatch = useDispatch();
  const { singleLog, status, error } = useSelector((state) => state.logCurve);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchLogCurveById(params.id));
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
      {singleLog ? (
        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-16 text-center">
              Details for Log Curve {singleLog.LOG_CURVE_ID} (Service:{" "}
              {singleLog.SERVICE_NAME})
            </h2>
            <LogCurveDetails singleLog={singleLog} />
          </div>
          {/* Ignora el DataView si no es necesario */}
        </div>
      ) : (
        <div>No log curve found with ID: {params.id}</div>
      )}
    </div>
  );
};

export default LogCurvePage;
