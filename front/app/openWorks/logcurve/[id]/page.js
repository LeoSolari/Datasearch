"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogCurveById } from "@/redux/slices/logcurveSlice";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleLog, status, error } = useSelector((state) => state.logCurve);

  console.log(singleLog, status, error);

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
    <div>
      {" "}
      <div className="p-24">
        {singleLog.map((log, i) => (
          <div key={i} className="flex justify-around p-12">
            <p className="p-2">LOG_CURVE_ID:{log.LOG_CURVE_ID}</p>
            <p className="p-2">WELL_ID:{log.WELL_ID}</p>
            <p className="p-2">SERVICE_NAME:{log.SERVICE_NAME}</p>
            <p className="p-2">LOG_CRV_NAME_ID:{log.LOG_CRV_NAME_ID}</p>
            <p className="p-2">TOTAL_SAMPLES:{log.TOTAL_SAMPLES}</p>
            <p className="p-2">TOP_DEPTH:{log.TOP_DEPTH}</p>
            <p className="p-2">BASE_DEPTH:{log.BASE_DEPTH}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
