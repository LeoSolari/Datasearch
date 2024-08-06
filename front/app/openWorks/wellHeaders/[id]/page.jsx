'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWellById } from "@/redux/slices/wellSlice";
import { fetchLogCurveById } from "@/redux/slices/logcurveSlice";
import { fetchCombinedPicks } from "@/redux/slices/combinedPickSlice";
import { fetchSurveyById } from "@/redux/slices/surveySlice"; // Import the fetchSurveyById action
import Link from "next/link";
import WellDetails from "@/components/wellDetails/WellDetails";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleWell, status: wellStatus, error: wellError } = useSelector((state) => state.wells);
  const { singleLog, status: logStatus, error: logError } = useSelector((state) => state.logCurve);
  const { picks: combinedPicks, loading: combinedPicksLoading } = useSelector((state) => state.combinedPicks);
  const { singleSurvey, status: surveyStatus, error: surveyError } = useSelector((state) => state.survey); // Add survey selector

  const [surveyData, setSurveyData] = useState([]);
  const [logCurveData, setLogCurveData] = useState([]); // State for log curve data
  const [isSurveyOpen, setSurveyOpen] = useState(false);
  const [isPicksOpen, setPicksOpen] = useState(false);
  const [isLogCurveOpen, setLogCurveOpen] = useState(false);

  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [loadingPicks, setLoadingPicks] = useState(false);
  const [loadingLogCurve, setLoadingLogCurve] = useState(false); // State for loading log curve data

  useEffect(() => {
    setSurveyData([]);
  }, [params.id]);

  useEffect(() => {
    setLogCurveData([]); // Clear log curve data on id change
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
    if (!isSurveyOpen) {
      setLoadingSurvey(true);
      dispatch(fetchSurveyById(params.id)) // Fetch survey data by WELL_ID
        .then((response) => {
          if (response.payload && response.payload.length > 0) {
            setSurveyData([{ id: params.id, name: `Ir al survey` }]);
          } else {
            setSurveyData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching survey data:", error);
        })
        .finally(() => setLoadingSurvey(false));
    }
  };

  const handlePicksClick = () => {
    setPicksOpen(!isPicksOpen);
    if (!isPicksOpen) {
      setLoadingPicks(true);
      dispatch(fetchCombinedPicks(params.id))
        .then((response) => {
          if (response.payload && response.payload.length > 0) {
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
    if (!isLogCurveOpen) {
      setLoadingLogCurve(true);
      dispatch(fetchLogCurveById(params.id)) // Fetch log curve data by WELL_ID
        .then((response) => {
          if (response.payload && response.payload.length > 0) {
            setLogCurveData(response.payload);
          } else {
            setLogCurveData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching log curve data:", error);
        })
        .finally(() => setLoadingLogCurve(false));
    }
  };

  const sortedLogData = logCurveData.length > 0 ? [...logCurveData].sort((a, b) => a.LOG_CURVE_ID - b.LOG_CURVE_ID) : [];

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
              className="bg-gray-700 hover:bg-slate-500 text-white py-2 px-4 rounded w-full text-left"
              >
              Survey {isSurveyOpen ? '↑' : '↓'}
              </button>
              {isSurveyOpen && (
                <div className="bg-gray-800 p-4 rounded mt-2">
                  {loadingSurvey ? (
                    <p className="text-white">Loading...</p>
                  ) : surveyData.length > 0 ? (
                    surveyData.map((survey) => (
                      <Link href={`/openWorks/survey/${survey.id}`} key={survey.id}>
                        <p className="text-white cursor-pointer">{survey.name}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-white">No hay survey para este pozo.</p>
                  )}
                </div>
              )}
            </div>

            <div>
            <button
              onClick={handlePicksClick}
              className="bg-gray-700 hover:bg-slate-500 text-white py-2 px-4 rounded w-full text-left"
              >
              Picks {isPicksOpen ? '↑' : '↓'}
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
                        <th className="py-2 px-4 border-b border-gray-600">PICK NAME</th>
                        <th className="py-2 px-4 border-b border-gray-600">PICK DEPTH</th>
                        <th className="py-2 px-4 border-b border-gray-600">INTERPRETE</th>
                        <th className="py-2 px-4 border-b border-gray-600">PICK OBS</th> 
                        <th className="py-2 px-4 border-b border-gray-600">CONFIDENCE</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {combinedPicks.map((pick, index) => (
                          <tr key={index} className="bg-gray-800">
                            <td className="py-2 px-4 border-b border-gray-600">{pick.PICK_SURF_NAME || pick.PICK_SURF_ID}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{typeof pick.PICK_DEPTH === 'number' ? pick.PICK_DEPTH.toFixed(2) : 'N/A'}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{pick.DATA_SOURCE}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{pick.PICK_OBS_NO}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{pick.PICK_CONF_FACT !== null ? "GOOD" : "-"}</td>
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
              className="bg-gray-700 hover:bg-slate-500 text-white py-2 px-4 rounded w-full text-left"
            >
            Log Curve {isLogCurveOpen ? '↑' : '↓'}
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
                          <th className="py-2 px-4 border-b border-gray-600">LOG RUN N°</th>
                          <th className="py-2 px-4 border-b border-gray-600">SERVICE NAME</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {sortedLogData.map((log, index) => (
                          <tr key={index} className="bg-gray-800">
                            <td className="py-2 px-4 border-b border-gray-600">{log.LOG_CRV_NAME}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.TOP_DEPTH.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.BASE_DEPTH.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{log.LOG_RUN_NO === -1 ? "C" : log.LOG_RUN_NO}</td>          
                            <td className="py-2 px-4 border-b border-gray-600">{log.SERVICE_NAME}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-white">No hay log curves para este pozo.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading well data...</p>
      )}
    </div>
  );
};

export default Page;