"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/UI/Input";
import { fetchlogCurve } from "@/redux/slices/logcurveSlice";

const Page = () => {
  const dispatch = useDispatch();
  const logCurveData = useSelector((state) => state.logCurve.logs);
  const [searchTermServiceName, setSearchTermServiceName] = useState("");
  const [searchTermLogCurveID, setSearchTermLogCurveID] = useState("");
  const [searchTermWellId, setSearchTermWellId] = useState("");

  useEffect(() => {
    dispatch(fetchlogCurve());
  }, [dispatch]);

  const filteredLogCurveData = logCurveData
    .filter(
      (el) =>
        el.LOG_CURVE_ID &&
        String(el.LOG_CURVE_ID).includes(searchTermLogCurveID)
    )
    .filter(
      (el) =>
        el.SERVICE_NAME &&
        el.SERVICE_NAME.toLowerCase().includes(
          searchTermServiceName.toLowerCase()
        )
    )
    .filter(
      (el) => el.WELL_ID && String(el.WELL_ID).includes(searchTermWellId)
    );

    console.log(filteredLogCurveData)

  return (
    <div className="bg-gray-900 h-screen pt-8 text-white">
      <div className="bg-gray-900 text-gray-200 rounded-lg overflow-auto py-20">
        <div className="flex justify-around">
          <Input
            placeholder="Search by well ID..."
            value={searchTermWellId}
            onChange={(e) => setSearchTermWellId(e.target.value)}
          />
          <Input
            placeholder="Search by lease log ID"
            value={searchTermLogCurveID}
            onChange={(e) => setSearchTermLogCurveID(e.target.value)}
          />
          <Input
            placeholder="Search by Service name"
            value={searchTermServiceName}
            onChange={(e) => setSearchTermServiceName(e.target.value)}
          />
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-900 text-gray-300 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-6">LOG CURVE ID</th>
              <th className="py-3 px-6">WELL ID</th>
          
              <th className="py-3 px-6">SERVICE NAME</th>
              <th className="py-3 px-6">LOG Curve NAME ID</th>
              <th className="py-3 px-6">TOTAL SAMPLES</th>
              <th className="py-3 px-6">TOP DEPTH</th>
              <th className="py-3 px-6">BASE DEPTH</th>
          
              <th className="py-3 px-6">Go to log curve</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 bg-slate-900 text-sm font-light">
            {filteredLogCurveData.map((el, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-blue-500 hover:text-blue-50 text-center"
              >
                <td className="py-3 px-6">{el.LOG_CURVE_ID}</td>
                <td className="py-3 px-6">{el.WELL_ID}</td>
               
                <td className="py-3 px-6">{el.SERVICE_NAME}</td>
                <td className="py-3 px-6">{el.LOG_CRV_NAME_ID}</td>
                <td className="py-3 px-6">{el.TOTAL_SAMPLES}</td>
                <td className="py-3 px-6">{el.TOP_DEPTH.toFixed(2)}</td>

                <td className="py-3 px-6">{el.BASE_DEPTH.toFixed(2)}</td>

          

                <td className="py-3 px-6">
                  <Link href={`/openWorks/logcurve/${el.LOG_CURVE_ID}`}>
                    <p className="text-blue-500 hover:text-blue-700">→</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
