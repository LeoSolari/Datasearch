"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/UI/Input";

import { fetchSurvey } from "@/redux/slices/surveySlice";

const Page = () => {
  const dispatch = useDispatch();
  const surveyData = useSelector((state) => state.survey.survey);
  const [searchTermSurveyName, setSearchTermSurveyName] = useState("");
  const [searchTermWellId, setSearchTermWellId] = useState("");
  const [searchTermMeasuredDepth, setSearchTermMeasuredDepth] = useState("");

  useEffect(() => {
    dispatch(fetchSurvey());
  }, [dispatch]);

  const uniqueSurveyData = surveyData.reduce((acc, current) => {
    const existingIndex = acc.findIndex(
      (item) => item.WELL_ID === current.WELL_ID
    );
    if (existingIndex !== -1) {
      if (current.MEASURED_DEPTH > acc[existingIndex].MEASURED_DEPTH) {
        acc[existingIndex] = current;
      }
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

  const filteredSurveyData = uniqueSurveyData
    .filter((el) =>
      el.SURVEY_NAME
        ? el.SURVEY_NAME.toLowerCase().includes(
            searchTermSurveyName.toLowerCase()
          )
        : true
    )
    .filter((el) =>
      el.WELL_ID ? String(el.WELL_ID).includes(searchTermWellId) : true
    )
    .filter((el) =>
      el.MEASURED_DEPTH
        ? String(el.MEASURED_DEPTH).includes(searchTermMeasuredDepth)
        : true
    );

  filteredSurveyData.sort((a, b) => a.WELL_ID - b.WELL_ID);

  return (
    <div className="pt-[86px] bg-slate-900 text-white">
      <div className="flex justify-around pt-8 border-b-2">
        <Input
          placeholder="Search by Survey Name..."
          value={searchTermSurveyName}
          onChange={(e) => setSearchTermSurveyName(e.target.value)}
        />

        <Input
          placeholder="Search by Well ID..."
          value={searchTermWellId}
          onChange={(e) => setSearchTermWellId(e.target.value)}
        />

        <Input
          placeholder="Search by Measured Depth..."
          value={searchTermMeasuredDepth}
          onChange={(e) => setSearchTermMeasuredDepth(e.target.value)}
        />
      </div>

      <div className="h-screen bg-gray-900">
        <table className="w-full table-auto bg-gray-900">
          <thead className="bg-gray-900">
            <tr className="bg-gray-900 text-gray-300 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-6">WELL_ID</th>
              <th className="py-3 px-6">SURVEY_NAME</th>
              <th className="py-3 px-6">MEASURED_DEPTH</th>
              <th className="py-3 px-6">INCLINATION</th>
              <th className="py-3 px-6">AZIMUTH</th>
              <th className="py-3 px-6">TRUE_VERT_DEPTH</th>
              <th className="py-3 px-6">X_OFFSET</th>
              <th className="py-3 px-6">Y_OFFSET</th>
              <th className="py-3 px-6">Go to well</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 bg-slate-900 text-sm font-light">
            {filteredSurveyData.map((el, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-blue-500 hover:text-blue-50 text-center"
              >
                <td className="py-3 px-6">{el.WELL_ID}</td>
                <td className="py-3 px-6">{el.SURVEY_NAME}</td>
                <td className="py-3 px-6">{el.MEASURED_DEPTH}</td>
                <td className="py-3 px-6">{el.INCLINATION}</td>
                <td className="py-3 px-6">{el.AZIMUTH}</td>
                <td className="py-3 px-6">{el.TRUE_VERT_DEPTH}</td>
                <td className="py-3 px-6">{el.X_OFFSET}</td>
                <td className="py-3 px-6">{el.Y_OFFSET}</td>
                <td className="py-3 px-6">
                  <Link href={`/openWorks/survey/${el.WELL_ID}`}>
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
