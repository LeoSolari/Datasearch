"use client";
import React, { useEffect } from "react";
import { fetchSurveyById } from "@/redux/slices/surveySlice";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const { singleSurvey, status, error } = useSelector((state) => state.survey);

  console.log(singleSurvey, status, error);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSurveyById(params.id));
    }
  }, [dispatch, params.id]);

  if (status === "loading") {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-24">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
       
              <th className="py-2 px-4 border-b">SURVEY NAME</th>
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
              
                <td className="py-2 px-4 border-b">{survey.SURVEY_NAME}</td>
                <td className="py-2 px-4 border-b">{parseFloat(survey.MEASURED_DEPTH).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{survey.INCLINATION.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{survey.AZIMUTH.toFixed(2)}</td>
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
