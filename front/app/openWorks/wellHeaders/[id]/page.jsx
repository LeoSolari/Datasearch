'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWellById } from "@/redux/slices/wellSlice";
import { fetchLogCurveById } from "@/redux/slices/logcurveSlice";
import { fetchSurfNameBySurfId } from "@/redux/slices/surfNameSlice";
import { fetchCombinedPicks } from "../../../../redux/slices/combinedPickSlice";
import Link from "next/link";
import WellDetails from "@/components/wellDetails/WellDetails";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleWell, status: wellStatus, error: wellError } = useSelector((state) => state.wells);
  const { singleLog, status: logStatus, error: logError } = useSelector((state) => state.logCurve);
  const { picks: combinedPicks, loading: combinedPicksLoading } = useSelector((state) => state.combinedPicks);

  const [surveyData, setSurveyData] = useState([]);
  const [isSurveyOpen, setSurveyOpen] = useState(false);
  const [isPicksOpen, setPicksOpen] = useState(false);
  const [isLogCurveOpen, setLogCurveOpen] = useState(false);

  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [loadingPicks, setLoadingPicks] = useState(false);

  useEffect(() => {
    setSurveyData([]);
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchWellById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (singleWell && singleWell.WELL_ID) {
      dispatch(fetchLogCurveById(singleWell.WELL_ID));
    }
  }, [dispatch, singleWell]);

  const handleSurveyClick = () => {
    setSurveyOpen(!isSurveyOpen);
    if (!isSurveyOpen && surveyData.length === 0) {
      setLoadingSurvey(true);
      setTimeout(() => {
        setSurveyData([{ id: params.id, name: `Ir al survey` }]);
        setLoadingSurvey(false);
      }, 1000);
    }
  };

  const handlePicksClick = () => {
    setPicksOpen(!isPicksOpen);
    if (!isPicksOpen) {
      setLoadingPicks(true);
      
      // Clear old picks data
      dispatch(fetchCombinedPicks(params.id))
        .then((response) => {
          if (response.payload && response.payload.length > 0) {
            // Set the new picks data
            // Update the state with the new picks
          } else {
            // Handle no picks scenario
          }
        })
        .catch((error) => {
          console.error("Error fetching combined picks:", error);
        })
        .finally(() => setLoadingPicks(false));
    }
  };
  

  const handleLogCurveClick = () => {
    setLogCurveOpen(!isLogCurveOpen);
  };

  const sortedLogData = singleLog ? [...singleLog].sort((a, b) => a.LOG_CURVE_ID - b.LOG_CURVE_ID) : [];

  if (wellStatus === "loading" || logStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (wellStatus === "failed" || logStatus === "failed") {
    return <div>Error: {wellError || logError}</div>;
  }

  return (
    <div className="mx-auto p-24 bg-slate-900">
      <div className="p-4">
        <Link href="/openWorks/wellHeaders/">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Volver a OpenWorks
          </p>
        </Link>
      </div>

      {singleWell ? (
        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden py-24">
          <h2 className="text-4xl text-center p-8 text-white">{singleWell.FIELD}</h2>
          <WellDetails singleWell={singleWell} />

          <div className="p-4 space-y-4">
            <div>
              <button
                onClick={handleSurveyClick}
                className="bg-gray-700 text-white py-2 px-4 rounded w-full text-left"
              >
                Survey ↓
              </button>
              {isSurveyOpen && (
                <div className="bg-gray-800 p-4 rounded mt-2">
                  {loadingSurvey ? (
                    <p className="text-white">Loading...</p>
                  ) : (
                    surveyData.map((survey) => (
                      <Link href={`http://localhost/openWorks/survey/${survey.id}`} key={survey.id}>
                        <p className="text-white cursor-pointer">{survey.name}</p>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handlePicksClick}
                className="bg-gray-700 text-white py-2 px-4 rounded w-full text-left"
              >
                Picks ↓
              </button>
              {isPicksOpen && (
                <div className="bg-gray-800 p-4 rounded mt-2 overflow-x-auto">
                  {loadingPicks ? (
                    <p className="text-white">Loading picks...</p>
                  ) : combinedPicks.length > 0 ? (
                    <>
                      <table className="min-w-full bg-gray-800 border border-gray-600 text-white">
                        <thead className="text-center">
                          <tr className="bg-gray-700">
                            <th className="py-2 px-4 border-b border-gray-600">Surf Name</th>
                            <th className="py-2 px-4 border-b border-gray-600">Pick Depth</th>
                            <th className="py-2 px-4 border-b border-gray-600">Origin Data Source</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                        {combinedPicks.map((pick, index) => (
                          <tr key={index} className="bg-gray-800">
                          <td className="py-2 px-4 border-b border-gray-600">{pick.LOCAL_NAME || pick.PICK_SURF_ID}</td>
                          <td className="py-2 px-4 border-b border-gray-600">{typeof pick.PICK_DEPTH === 'number' ? pick.PICK_DEPTH.toFixed(2) : 'N/A'}</td>
                          <td className="py-2 px-4 border-b border-gray-600">{pick.ORIGINAL_DATA_SOURCE}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <p className="text-white">No hay picks para este pozo.</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleLogCurveClick}
                className="bg-gray-700 text-white py-2 px-4 rounded w-full text-left"
              >
                Log Curve ↓
              </button>
              {isLogCurveOpen && (
                <div className="bg-gray-800 p-4 rounded mt-2 overflow-x-auto">
                  {sortedLogData.length > 0 ? (
                    <table className="min-w-full bg-gray-800 border border-gray-600 text-white">
                      <thead className="text-center">
                        <tr className="bg-gray-700">
                          <th className="py-2 px-4 border-b border-gray-600">LOG CURVE</th>
                          <th className="py-2 px-4 border-b border-gray-600">TOP DEPTH</th>
                          <th className="py-2 px-4 border-b border-gray-600">BASE DEPTH</th>
                          <th className="py-2 px-4 border-b border-gray-600">TOTAL SAMPLES</th>
                          <th className="py-2 px-4 border-b border-gray-600">PERFORATION</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {sortedLogData.map((log, index) => (
                          <tr key={index} className="bg-gray-800">
                            <td className="py-2 px-4 border-b border-gray-600">{log.LOG_CRV_NAME}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.TOP_DEPTH}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.BASE_DEPTH}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.TOTAL_SAMPLES}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.SERVICE_NAME}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-white">No hay datos de log curve para este pozo.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center">Seleccione un pozo para ver los detalles.</p>
      )}
    </div>
  );
};

export default Page;
