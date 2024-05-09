"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";

import { fetchSurvey } from "@/redux/slices/surveySlice";

const Page = () => {
  const dispatch = useDispatch();
  const surveyData = useSelector((state) => state.survey.survey);

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

  uniqueSurveyData.sort((a, b) => a.WELL_ID - b.WELL_ID);

  /*  const [searchTermName, setSearchTermName] = useState("");
    const [searchTermUWI, setSearchTermUWI] = useState("");
    const [searchTermCounty, setSearchTermCounty] = useState("");
    const [searchTermField, setSearchTermField] = useState("");
    const [searchTermWellId, setSearchTermWellId] = useState("");*/

  /*
    useEffect(() => {
      dispatch(fetchWells());
    }, [dispatch]);
  
    const filteredWellsByName = filterByName(wellsData, searchTermName);
  
    const filteredWellsByUWI = filterByUWI(wellsData, searchTermUWI);
  
    const filteredWellsByCounty = filterByCounty(wellsData, searchTermCounty);
  
    const filteredWellsByField = filterByField(wellsData, searchTermField);
  
    const filteredWellsById = filterById(wellsData, searchTermWellId);
   */

  return (
    <div className="p-24">
      {uniqueSurveyData.map((el, i) => (
        <div key={i} className="flex justify-around p-4">
          <Link href={`/openWorks/survey/${el.WELL_ID}`}>
            <p className="p-4">WELL ID:{el.WELL_ID}</p>
          </Link>
          <p className="p-4">SURVEY_NAME: {el.SURVEY_NAME}</p>
          <p className="p-4">MEASURED_DEPTH: {el.MEASURED_DEPTH} </p>
          <p className="p-4">INCLINATION: {el.INCLINATION} </p>
          <p className="p-4">AZIMUTH: {el.AZIMUTH} </p>
          <p className="p-4">TRUE_VERT_DEPTH: {el.TRUE_VERT_DEPTH} </p>
          <p className="p-4">X_OFFSET: {el.X_OFFSET} </p>
          <p className="p-4">Y_OFFSET: {el.Y_OFFSET} </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
