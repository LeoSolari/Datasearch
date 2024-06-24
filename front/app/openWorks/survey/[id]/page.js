"use client";
import React, { useEffect, useRef } from "react";
import { fetchSurveyById } from "@/redux/slices/surveySlice";
import { fetchSurveyHdrById } from "@/redux/slices/surveyHdrSlice";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleSurvey, status, error } = useSelector((state) => state.survey);
  const { singleSurveyHdr, statusHdr, errorHdr } = useSelector((state) => state.surveyHdr);

  const headerRef = useRef(null); // Ref para el elemento de la tabla de header
  const surveyRef = useRef(null); // Ref para el elemento de la tabla de survey

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSurveyById(params.id));
      dispatch(fetchSurveyHdrById(params.id));
    }
  }, [dispatch, params.id]);

  const scrollToHeader = () => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToSurvey = () => {
    surveyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (status === "loading" || statusHdr === "loading") {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === "failed" || statusHdr === "failed") {
    return <div className="text-center text-red-600">Error: {error || errorHdr}</div>;
  }

  const surveyName = singleSurvey.length > 0 ? singleSurvey[0].SURVEY_NAME : "";

  return (
    <div className="p-24">
     
      <h1 className="text-3xl font-bold mb-6 text-center">{surveyName}</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4">Header Table</h2>
        <table className="min-w-full bg-white border border-gray-300 mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">WELL_ID</th>
              <th className="py-2 px-4 border-b">SURVEY_NAME</th>
              <th className="py-2 px-4 border-b">DATA_SOURCE</th>
              <th className="py-2 px-4 border-b">CREATE_DATE</th>
              <th className="py-2 px-4 border-b">UPDATE_DATE</th>
              <th className="py-2 px-4 border-b">COMPANY_NAME</th>
              <th className="py-2 px-4 border-b">SURVEY_CALC_MTHD</th>
              <th className="py-2 px-4 border-b">NORTH_REFERENCE</th>
              <th className="py-2 px-4 border-b">PREFERRED_SURVEY_IND</th>
              <th className="py-2 px-4 border-b">TOTAL_SAMPLES</th>
              <th className="py-2 px-4 border-b">SCALE_TYPE</th>
              <th className="py-2 px-4 border-b">MAX_INCLINATION</th>
              <th className="py-2 px-4 border-b">MAX_LATERAL_DISTANCE</th>
            </tr>
          </thead>
          <tbody>
            {singleSurveyHdr.map((survey, i) => (
              <tr key={i} className={`bg-${i % 2 === 0 ? "white" : "gray-50"} text-center`}>
                <td className="py-2 px-4 border-b">{survey.WELL_ID}</td>
                <td className="py-2 px-4 border-b">{survey.SURVEY_NAME}</td>
                <td className="py-2 px-4 border-b">{survey.DATA_SOURCE}</td>
                <td className="py-2 px-4 border-b">{survey.CREATE_DATE}</td>
                <td className="py-2 px-4 border-b">{survey.UPDATE_DATE}</td>
                <td className="py-2 px-4 border-b">{survey.COMPANY_NAME}</td>
                <td className="py-2 px-4 border-b">{survey.SURVEY_CALC_MTHD}</td>
                <td className="py-2 px-4 border-b">{survey.NORTH_REFERENCE}</td>
                <td className="py-2 px-4 border-b">{survey.PREFERRED_SURVEY_IND}</td>
                <td className="py-2 px-4 border-b">{survey.TOTAL_SAMPLES}</td>
                <td className="py-2 px-4 border-b">{survey.SCALE_TYPE}</td>
                <td className="py-2 px-4 border-b">{survey.MAX_INCLINATION}</td>
                <td className="py-2 px-4 border-b">{survey.MAX_LATERAL_DISTANCE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla del Survey */}
      <div ref={surveyRef}>
        <h2 className="text-2xl font-bold mb-4">Survey Table</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">MEASURED DEPTH</th>
              <th className="py-2 px-4 border-b">INCLINATION</th>
              <th className="py-2 px-4 border-b">AZIMUTH</th>
              <th className="py-2 px-4 border-b">TRUE VERT DEPTH</th>
              <th className="py-2 px-4 border-b">X OFFSET</th>
              <th className="py-2 px-4 border-b">Y OFFSET</th>
            </tr>
          </thead>
          <tbody>
            {singleSurvey.map((survey, i) => (
              <tr key={i} className={`bg-${i % 2 === 0 ? "white" : "gray-50"} text-center`}>
                <td className="py-2 px-4 border-b">{parseFloat(survey.MEASURED_DEPTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.INCLINATION).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.AZIMUTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.TRUE_VERT_DEPTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.X_OFFSET).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.Y_OFFSET).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
