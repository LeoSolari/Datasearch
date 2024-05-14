"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";

import { fetchlogCurve } from "@/redux/slices/logcurveSlice";

const Page = () => {
  const dispatch = useDispatch();
  const logCurveData = useSelector((state) => state.logCurve.logs);

  useEffect(() => {
    dispatch(fetchlogCurve());
  }, [dispatch]);

  /* 
  const uniquelogCurveData = logCurveData.reduce((acc, current) => {
    const existingIndex = acc.findIndex(
      (item) => item.LOG_CURVE_ID === current.LOG_CURVE_ID
    );
    if (existingIndex !== -1) {
      if (current.TOP_DEPTH > acc[existingIndex].TOP_DEPTH) {
        acc[existingIndex] = current;
      }
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

  uniquelogCurveData.sort((a, b) => a.LOG_CURVE_ID - b.LOG_CURVE_ID);
*/
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
      {logCurveData.map((el, i) => (
        <div key={i} className="flex justify-around p-4">
          <Link href={`/openWorks/logcurve/${el.LOG_CURVE_ID}`}>
            <p className="p-4">LOG_CURVE_ID:{el.LOG_CURVE_ID}</p>
          </Link>
          <p className="p-4">WELL_ID: {el.WELL_ID}</p>
          <p className="p-4">MEASURED_DEPTH: {el.MEASURED_DEPTH} </p>
          <p className="p-4">SERVICE_NAME: {el.SERVICE_NAME} </p>
          <p className="p-4">LOG_CRV_NAME_ID: {el.LOG_CRV_NAME_ID} </p>
          <p className="p-4">TOTAL_SAMPLES: {el.TOTAL_SAMPLES} </p>
          <p className="p-4">TOP_DEPTH: {el.TOP_DEPTH} </p>
          <p className="p-4">BASE_DEPTH: {el.BASE_DEPTH} </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
