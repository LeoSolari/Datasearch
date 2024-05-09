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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-24">
      {singleSurvey.map((survey, i) => (
        <div key={i} className="flex justify-around p-12">
          <p className="p-2">{survey.WELL_ID}</p>
          <p className="p-2">{survey.SURVEY_NAME}</p>
          <p className="p-2">{survey.MEASURED_DEPTH}</p>
          <p className="p-2">{survey.INCLINATION}</p>
          <p className="p-2">{survey.AZIMUTH}</p>
          <p className="p-2">{survey.TRUE_VERT_DEPTH}</p>
          <p className="p-2">{survey.X_OFFSET}</p>
          <p className="p-2">{survey.Y_OFFSET}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
